"use strict";
universityEditorController.$inject = ['$scope', 'UniversityWebApiService']

function universityEditorController($scope, UniversityWebApiService) {
    let itemID;

    loadParameters ();
    defineScope ();
    load ();

    function loadParameters (){
        itemID = $scope.parameters.id;
    }

    function defineScope() {
        $scope.scopeModel ={
            item:{}
        }

        $scope.scopeModel.save = function () {            
            if ($scope.parameters.type == "Add") {
                UniversityWebApiService.AddUniversity({
                    uniID: itemID,
                    uniName:$scope.scopeModel.item.uniName
                }).then(() => {
                    $scope.parameters.callback()
                    $scope.close()
                })
            } else if ($scope.parameters.type == "Edit") {
                UniversityWebApiService.EditUniversity({
                    uniID: itemID,
                    uniName: $scope.scopeModel.item.uniName
                }).then(() => {
                    $scope.parameters.callback(itemID)
                    $scope.close()
                })
            }
        }
    }

    function load() {
        loadAllControls()

        function loadAllControls() {
            if ($scope.parameters.type == 'Edit' && itemID) {
                getEntireItem().then((res)=>{
                    $scope.scopeModel.item = res.data[0]
                });
            }
        }

        function getEntireItem() {
            return UniversityWebApiService.GetUniversityById(itemID);
        }
    }
}

mainApp.controller ('university_editor_controller', universityEditorController)