"use strict"
mainApp.directive("genderSelector", [function () {
    var directive = {
        restrict: "E",
        scope: {
            onReady:'=',
        },
        templateUrl: "MyDirectives/Gender/Templates/SelectGender.html",
        controller: function ($scope, $element, $attrs, $q, GenderEnum) {
            var ctor = new Ctor( $scope, $attrs, $q, GenderEnum)
            ctor.initializeController()
        },
    }

    function Ctor( $scope, $attrs, $q, GenderEnum) {
        this.initializeController = initializeController

        function initializeController() {
            $scope.selected=1
            $scope.items={}
            defineAPI()
        }

        function defineAPI() {
            var api = {}
            api.load = function (payload) {

                var data = payload.data
                if(data)$scope.selected=data
                
                return loadItemDirective()

                function loadItemDirective() {
                    var loadDeferred = $q.defer()

                    $scope.items = Object.values(GenderEnum)
                    
                    if($scope.items){
                        loadDeferred.resolve()
                    } else{
                        loadDeferred.reject()
                    }

                    return loadDeferred.promise
                }
            }
            api.getData = function () {
                return $scope.selected
            }
            if ($scope.onReady != null && typeof $scope.onReady == "function")
                $scope.onReady(api)
        }
    }

    return directive
}])