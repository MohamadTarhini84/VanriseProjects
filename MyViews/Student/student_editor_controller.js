"use strict"
studentEditorController.$inject = ["$scope", "$q", "StudentWebApiService", "PromisesService"]

function studentEditorController($scope, $q, StudentWebApiService, PromisesService) {
    let itemID;
    let isUniReady = false;
    let genderAPI, uniAPI, depAPI, paymentAPI, aidAPI
    let genderPromiseDeferred = $q.defer();
    let uniPromiseDeferred = $q.defer();
    let depPromiseDeferred = $q.defer();
    let paymentPromiseDeferred = $q.defer()
    let aidPromiseDeferred = $q.defer()

    let context = {
        state: {
            selected: "",
            disabled: false
        },
        setCurrency: function (newCurr) {
            this.state.selected = newCurr
            this.state.disabled = true
        },
        removeCurrency: function () {
            this.state.disabled = false
        }
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
            onGenderDirectiveReady: function (api) {
                genderAPI = api
                genderPromiseDeferred.resolve()
            },
            onUniDirectiveReady: function (api) {
                uniAPI = api;
                uniPromiseDeferred.resolve();
            },
            onDepDirectiveReady: function (api) {
                depAPI = api
                depPromiseDeferred.resolve()
            },
            onPaymentDirectiveReady: function (api) {
                paymentAPI = api
                paymentPromiseDeferred.resolve()
            },
            onAidDirectiveReady: function (api) {
                aidAPI = api
                aidPromiseDeferred.resolve()
            },
            onSelectionChanged: function (selectedUni) {
                if(isUniReady){
                    depAPI.load({
                        data: { depID: $scope.scopeModel.item.depID, uniID: selectedUni },
                    })
                }
            }
        }

        $scope.scopeModel.save = Save
    }

    function load() {
        loadAllControls()

        function loadAllControls() {
            if ($scope.parameters.type == "Edit") {
                getEntireItem().then((res) => {
                    $scope.scopeModel.item = res.data[0]
                    loadItemDirective()
                })
            } else {
                loadItemDirective()
            }
        }

        function getEntireItem() {
            return StudentWebApiService.GetStudentById(itemID)
        }

        function loadItemDirective() {
            let loadDeferred = $q.defer()
            let promises = [
                loadGenderDirective(),
                loadUniversityDirective(),
                loadPaymentDirective(),
                loadAidDirective()
            ]

            PromisesService.waitMultiplePromises(promises).then(() => {
                loadDeferred.resolve()
            }).catch((err)=>{
                loadDeferred.reject()
            })

            return loadDeferred.promise
        }

        function loadGenderDirective()
        {
            let defer=$q.defer()
            genderPromiseDeferred.promise.then(function(){
                let payload ={ data: $scope.scopeModel.item.studentGender }

                genderAPI.load(payload).then(function(){
                    defer.resolve();
                })
            });
            return defer.promise;
        }

        function loadUniversityDirective()
        {
            let defer=$q.defer()
            uniPromiseDeferred.promise.then(function(){
                let payload ={ data: $scope.scopeModel.item.uniID }

                uniAPI.load(payload).then(function () {
                    isUniReady = true
                    if ($scope.scopeModel.item.uniID)
                        $scope.scopeModel.onSelectionChanged($scope.scopeModel.item.uniID)
                    defer.resolve();
                })
            });
            return defer.promise;
        }

        function loadPaymentDirective() {
            let defer = $q.defer()
            paymentPromiseDeferred.promise.then(function () {
                let payload = {
                    data: $scope.scopeModel.item,
                    context
                }

                paymentAPI.load(payload).then(function () {
                    defer.resolve();
                })
            });
            return defer.promise;
        }

        function loadAidDirective() {
            let defer = $q.defer()
            aidPromiseDeferred.promise.then(function () {
                let payload = {
                    data: $scope.scopeModel.item,
                    context
                }

                aidAPI.load(payload).then(function () {
                    defer.resolve();
                })
            });
            return defer.promise;
        }
    }

    function Save() {
        if ($scope.parameters.type == "Add") {
            let result = {
                studentID: itemID,
                studentName: $scope.scopeModel.item.studentName,
                studentGender: genderAPI.getData(),
                uniID: uniAPI.getData(),
                depID: depAPI.getData(),
                PaymentMethod: paymentAPI.getData(),
                FinancialAid: aidAPI.getData()
            }

            StudentWebApiService.AddStudent(result).then(() => {
                $scope.parameters.callback()
                $scope.close()
            })
        } else if ($scope.parameters.type == "Edit") {
            let result = {
                studentID: itemID,
                studentName: $scope.scopeModel.item.studentName,
                studentGender: genderAPI.getData(),
                uniID: uniAPI.getData(),
                depID: depAPI.getData(),
                PaymentMethod: paymentAPI.getData(),
                FinancialAid: aidAPI.getData()
            }

            StudentWebApiService.EditStudent(result).then(() => {
                $scope.parameters.callback(itemID)
                $scope.close()
            })
        }
    }
}

mainApp.controller("student_editor_controller", studentEditorController)
