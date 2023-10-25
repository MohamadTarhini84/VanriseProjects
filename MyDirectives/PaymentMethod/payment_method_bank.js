"use strict"
mainApp.directive("paymentmethodBank", [
    function () {
        var directive = {
            restrict: "E",
            scope: {
                onReady: "=",
            },
            templateUrl: "MyDirectives/PaymentMethod/Templates/PaymentBank.html",
            controller: function ($scope, $element, $attrs, $q) {
                var ctor = new Ctor($scope, $attrs, $q)
                ctor.initializeController()
            },
        }

        function Ctor($scope, $attrs, $q) {
            this.initializeController = initializeController

            function initializeController() {
                $scope.scopeModel={
                    bank: ""
                }

                defineAPI()
            }

            function defineAPI() {
                var api = {}
                api.load = function (payload) {
                    var data = payload.data

                    return loadItemDirective()

                    function loadItemDirective() {
                        let defer = $q.defer()

                        if (data.PaymentMethod)
                            $scope.scopeModel.bank = data.PaymentMethod.BankName || ""
                        defer.resolve()

                        return defer.promise
                    }
                }
                api.getData = function () {
                    return {
                        $type: "VanriseInternship.Bank, VanriseInternship",
                        BankName: $scope.scopeModel.bank
                    }
                }
                if ($scope.onReady != null && typeof $scope.onReady == "function")
                    $scope.onReady(api)
            }
        }

        return directive
    },
])
