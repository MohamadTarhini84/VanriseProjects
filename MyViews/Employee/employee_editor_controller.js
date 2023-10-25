"use strict"
employeeEditorController.$inject = ["$scope", "$q", "EmployeeWebApiService", "PromisesService"]

function employeeEditorController($scope, $q, EmployeeWebApiService, PromisesService) {
    let itemID;
    let hobbiesAPI, hobbyDetailsAPI
    let hobbiesDeferred = $q.defer()
    let hobbyDetailsDeferred = $q.defer()

    let context = {
        Hobbies: [],
        HobbyDetails: [],
        detailsButtonDisabled: true,
        AddHobby: function () {
            let hobby = { ID: crypto.randomUUID(), Name: '' }
            this.Hobbies.push(hobby)
            this.detailsButtonDisabled = false
        },
        RemoveHobby: function (hobby) {
            let index = this.Hobbies.indexOf(hobby)
            if (index != -1) { 
                this.Hobbies.splice(index, 1);
                let result = this.HobbyDetails.find((obj) => (obj.ID == hobby.ID))

                if (this.HobbyDetails.length > this.Hobbies.length) {
                    if (result) {
                        this.RemoveDetail(result)
                    } else {
                        this.RemoveDetail(this.HobbyDetails.find((obj) => (obj.ID == '')))
                    }
                } else {
                    if(result)
                        result.ID=""
                }

                if (this.HobbyDetails.length == this.Hobbies.length)
                    this.detailsButtonDisabled = true
            }
        },
        AddDetail: function () {
            let hobbyDetail = { }
            this.HobbyDetails.push(hobbyDetail)

            if (this.HobbyDetails.length == this.Hobbies.length)
                this.detailsButtonDisabled=true

            let payload = { data: $scope.scopeModel.item, context }
            hobbyDetailsAPI.load(payload)
        },
        RemoveDetail: function (hobbyDetail) {
            let index = this.HobbyDetails.indexOf(hobbyDetail);
            if (index !== -1) {
                this.HobbyDetails.splice(index, 1)
                this.detailsButtonDisabled = false
            }
        },
    }

    defineScope()
    loadParameters()
    load()

    function loadParameters() {
        itemID = $scope.parameters.id
    }

    function defineScope() {
        $scope.scopeModel = {
            item: {},
            onHobbyGridReady: function (api) {
                hobbiesAPI = api
                hobbiesDeferred.resolve()
            },
            onDetailsGridReady: function (api) {
                hobbyDetailsAPI = api
                hobbyDetailsDeferred.resolve()
            },
            save:SaveData
        }
    }

    function load() {
        loadAllControls()

        function loadAllControls() {
            if ($scope.parameters.type == "Edit") {
                getEntireItem().then((res) => {
                    $scope.scopeModel.item = res.data
                    context.Hobbies = res.data.Hobbies
                    context.HobbyDetails = res.data.HobbyDetails

                    for (let i; i < context.HobbyDetails; i++) {
                        context.HobbyDetails[i].ID = context.Hobbies[i].ID
                    }

                    loadItemDirective()
                })
            } else {
                loadItemDirective()
            }
        }

        function getEntireItem() {
            return EmployeeWebApiService.GetEmployeeById(itemID)
        }

        function loadItemDirective() {
            let promises = [
                loadHobbyGrid(),
                loadHobbyDetailsGrid()
            ]

            return PromisesService.waitMultiplePromises(promises)
        }

        function loadHobbyGrid()
        {
            let defer=$q.defer()
            hobbiesDeferred.promise.then(function(){
                let payload ={ data: $scope.scopeModel.item, context, form: $scope.employeeForm }

                hobbiesAPI.load(payload).then(function(){
                    defer.resolve();
                })
            });
            return defer.promise;
        }

        function loadHobbyDetailsGrid() {
            let defer = $q.defer()
            hobbyDetailsDeferred.promise.then(function () {
                let payload = { data: $scope.scopeModel.item, context }

                hobbyDetailsAPI.load(payload).then(function () {
                    defer.resolve();
                })
            });
            return defer.promise;
        }
    }

    function SaveData() {
        if ($scope.parameters.type == "Add") {
            EmployeeWebApiService.AddEmployee({
                ID: itemID,
                Name: $scope.scopeModel.item.Name,
                Hobbies: context.Hobbies,
                HobbyDetails: context.HobbyDetails
            }).then(() => {
                $scope.parameters.callback()
                $scope.close()
            })
        } else if ($scope.parameters.type == "Edit") {
            EmployeeWebApiService.EditEmployee({
                ID: itemID,
                Name: $scope.scopeModel.item.Name,
                Hobbies: context.Hobbies,
                HobbyDetails: context.HobbyDetails
            }).then(() => {
                $scope.parameters.callback(itemID)
                $scope.close()
            })
        }
    }
}

mainApp.controller("employee_editor_controller", employeeEditorController)
