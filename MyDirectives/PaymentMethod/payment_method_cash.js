"use strict"
mainApp.directive("paymentmethodCash", [
    function () {
        var directive = {
            restrict: "E",
            scope: {
                onReady:"=",
            },
            templateUrl: "MyDirectives/PaymentMethod/Templates/PaymentCash.html",
            controller: function ($scope, $element, $attrs, $q) {
                var ctor = new Ctor($scope, $attrs, $q)
                ctor.initializeController()
            },
        }

        function Ctor($scope, $attrs, $q) {
            this.initializeController = initializeController
            let currencyAPI
            let itemReady = $q.defer()

            function initializeController() {
                $scope.scopeModel = {
                    onCurrencyReady: (api) => {
                        currencyAPI = api
                        itemReady.resolve()
                    }
                }

                defineAPI()
            }

            function defineAPI() {
                var api = {}
                api.load = function (payload) {

                    payload.data.state = payload.context.state

                    payload.data.state.updateCurrency = function (value) {
                        console.log("changed in cash payment to: " + value)
                    }

                    return loadItemDirective()

                    function loadItemDirective() {
                        var loadDeferred = $q.defer()

                        itemReady.promise.then(() => {
                            currencyAPI.load(payload).then(() => {
                                loadDeferred.resolve()
                            })
                        })

                        return loadDeferred.promise
                    }
                }
                api.getData = function () {
                    return {
                        $type: "VanriseInternship.Cash, VanriseInternship",
                        currencyId: currencyAPI.getData()
                    }
                }

                if ($scope.onReady != null && typeof $scope.onReady == "function") 
                    $scope.onReady(api)
            }
        }
        return directive
    },
])
