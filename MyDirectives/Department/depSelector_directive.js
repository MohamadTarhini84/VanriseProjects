"use strict"
mainApp.directive("depSelector", [function () {
    var directive = {
        restrict: "E",
        scope: {
            onReady: "="
        },
        templateUrl: "MyDirectives/Department/Templates/SelectDepartment.html",
        controller: function ($scope, $element, $attrs, $q, DepartmentWebApiService) {
            var ctor = new Ctor($scope, $attrs, $q, DepartmentWebApiService)
            ctor.initializeController()
        },
    }

    function Ctor($scope, $attrs, $q, DepartmentWebApiService) {
        this.initializeController = initializeController
        function initializeController() {
            $scope.selected=""
            $scope.items = {}
            defineAPI()
        }

        function defineAPI() {
            
            var api =   {
                load : function (payload) {
                    let data = payload.data

                    return loadItemDirective()
                    
                    function loadItemDirective() {
                        var loadDeferred = $q.defer()
                        DepartmentWebApiService.GetDepartmentsInfo(data.uniID).then((res)=>{
                            $scope.items=res.data
                            if($scope.items[0]){
                                if($scope.items.find(dep=>dep.depID==data.depID)){
                                    $scope.selected=data.depID
                                } else{
                                    $scope.selected=""
                                }
                            }
                            loadDeferred.resolve()
                        })
                    
                        return loadDeferred.promise
                    }
                },
                getData : function () {
                    return $scope.selected
                }
            }
            if ($scope.onReady != null && typeof $scope.onReady == "function")
                $scope.onReady(api)
        }    
    }

    return directive
}])