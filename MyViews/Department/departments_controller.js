"use strict"

mainApp.controller("departments_controller", DepartmentController)

DepartmentController.$inject = ["$scope","$q","DepartmentService"]

async function DepartmentController($scope, $q, DepartmentService) {
    let depGridAPI
    let deferred = $q.defer()

    defineScope()
    load()

    function defineScope() {

        $scope.scopeModel = {
            pageElements: [],
            currentPage:{},
            defaultPage: 0,
            AddDepartment: function () {DepartmentService.AddDepartment(onDepAdded)},
            onDirectiveReady : function (api){
                depGridAPI = api
                deferred.resolve()
            },
            onDepUpdated: function (uni) {
                loadData()
            }
        }

        function onDepAdded() {
            loadData(true)
        }
    }

    function load() {
        loadAllControls()
        function loadAllControls() {
            loadStaticData()
            loadData()

            function loadStaticData() {
                $scope.scopeModel.loadData = loadData
            }
        }
    }

    function loadData(isAdded) {
        deferred.promise.then(() => {
            depGridAPI.load({
                data: {
                    search: $scope.scopeModel.search,
                    added:isAdded || false
                }
            })
        })
    }
}
