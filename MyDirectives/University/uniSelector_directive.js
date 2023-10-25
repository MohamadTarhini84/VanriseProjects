"use strict"
mainApp.directive("uniSelector", [
    function () {
        var directive = {
            restrict: "E",
            scope: {
                onReady: '=',
                onSelectionChanged: '=',
                isDisabled: "="
            },
            templateUrl: "MyDirectives/University/Templates/SelectUniversity.html",
            controller: function ($scope, $element, $attrs, $q, UniversityWebApiService) {
                var ctor = new Ctor($scope, $attrs, $q, UniversityWebApiService)
                ctor.initializeController()
            }
        }

        function Ctor($scope, $attrs, $q, UniversityWebApiService) {
            this.initializeController = initializeController
            function initializeController() {
                $scope.selected=""
                $scope.items = {}


                $scope.$watch('selected', function (newValue, oldValue) {
                    if ($scope.onSelectionChanged != null 
                      && typeof $scope.onSelectionChanged == "function" 
                      && newValue!=oldValue){
                        $scope.onSelectionChanged($scope.selected)
                    }
                })

                defineAPI()
            }

            function defineAPI() {
                
                var api =   {
                    load : function (payload) {
                        var data = payload.data
                        if(data)
                            $scope.selected=data

                        return loadItemDirective()
                        
                        function loadItemDirective() {
                            var loadDeferred = $q.defer()
                            
                            UniversityWebApiService.GetUniversityInfo().then((res)=>{
                                $scope.items = res.data
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
    },
])
