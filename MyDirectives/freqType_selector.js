"use strict"
mainApp.directive("hobbyFrequencytypeSelector", [function () {
    var directive = {
        restrict: "E",
        scope: {
            onReady:'=',
        },
        templateUrl: "MyDirectives/Templates/SelectFrequency.html",
        controller: function ($scope, $element, $attrs, $q, FrequencyEnum) {
            var ctor = new Ctor($scope, $attrs, $q, FrequencyEnum)
            ctor.initializeController()
        },
    }

    function Ctor($scope, $attrs, $q, FrequencyEnum) {
        this.initializeController = initializeController

        function initializeController() {
            $scope.Hobby = {}
            $scope.items={}
            defineAPI()
        }

        function defineAPI() {
            var api = {}
            api.load = function (payload) {
                
                return loadItemDirective()

                function loadItemDirective() {
                    var loadDeferred = $q.defer()

                    $scope.items = Object.values(FrequencyEnum)

                    $scope.Hobby = payload.data

                    loadDeferred.resolve()

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