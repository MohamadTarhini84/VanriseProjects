"use strict";
departmentEditorController.$inject = ['$scope','$q', 'DepartmentWebApiService']

function departmentEditorController($scope, $q, DepartmentWebApiService) {
    let uniID
    let itemID;
    let uniAPI;
    let uniPromiseDeferred=$q.defer()

    defineScope ()
    loadParameters ()
    load ()

    function loadParameters() {
        itemID = $scope.parameters.id;
    }

    function defineScope() {
        $scope.scopeModel={
            item: {},
            uni:$scope.parameters.uni,
            onDirectiveReady : function (api){
                uniAPI = api
                uniPromiseDeferred.resolve()
            }
        }

        $scope.scopeModel.save = function () {
            
            if ($scope.parameters.type == "Add") {
                DepartmentWebApiService.AddDepartment({
                    depID: itemID,
                    depName:$scope.scopeModel.item.depName, 
                    uniID: uniAPI.getData()
                }).then(()=>{
                    $scope.parameters.callback()
                    $scope.close()
                })
            } else if ($scope.parameters.type == "Edit") {
                DepartmentWebApiService.EditDepartment({
                    depID: itemID,
                    depName: $scope.scopeModel.item.depName,
                    uniID: uniAPI.getData()
                }).then(() => {
                    $scope.parameters.callback(itemID)
                    $scope.close()
                })
            }
        }
    }

    function load() {
        loadAllControls()

        function loadAllControls (){
            getEntireItem().then((res)=>{
                if ($scope.parameters.type == 'Edit') {
                    $scope.scopeModel.item=res.data[0]
                    uniID = $scope.scopeModel.item.uniID
                }
                    loadItemDirective()
                });
        }

        function getEntireItem () {
            return DepartmentWebApiService.GetDepartmentById(itemID);
        }

        function loadItemDirective () {
            let loadDeferred = $q.defer() ;

            loadDepartmentDirective().then(()=>{
                loadDeferred.resolve()
            })

            return loadDeferred.promise;
        }

        function loadDepartmentDirective(){
            let defer=$q.defer()
            uniPromiseDeferred.promise.then(function(){
                let payload={data:$scope.scopeModel.item.uniID}

                uniAPI.load(payload).then(()=>{
                    defer.resolve()
                })
            })

            return defer.promise
        }
    }
}

mainApp.controller ('department_editor_controller', departmentEditorController)