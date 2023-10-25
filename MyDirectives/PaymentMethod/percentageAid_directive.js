"use strict"
mainApp.directive("percentageAid", [
    function () {
        var directive = {
            restrict: "E",
            scope: {
                onReady: "=",
            },
            templateUrl: "MyDirectives/PaymentMethod/Templates/PercentageAid.html",
            controller: function ($scope, $element, $attrs, $q) {
                var ctor = new Ctor($scope, $attrs, $q)
                ctor.initializeController()
            },
        }

        function Ctor($scope, $attrs, $q) {
            this.initializeController = initializeController

            function initializeController() {
                $scope.percentage=""

                defineAPI()
            }

            function defineAPI() {
                var api = {}
                api.load = function (payload) {
                    let data = payload.data
                    return loadItemDirective()

                    function loadItemDirective() {
                        let defer = $q.defer()

                        if (data.FinancialAid)
                            if (data.FinancialAid.AidType.PercentageValue)
                                $scope.percentage = data.FinancialAid.AidType.PercentageValue
                        defer.resolve()

                        return defer.promise
                    }
                }
                api.getData = function () {
                    return {
                        $type: "VanriseInternship.Percentage, VanriseInternship",
                        PercentageValue: $scope.percentage
                    }
                }

                if ($scope.onReady != null && typeof $scope.onReady == "function")
                    $scope.onReady(api)
            }
        }

        return directive
    },
])
