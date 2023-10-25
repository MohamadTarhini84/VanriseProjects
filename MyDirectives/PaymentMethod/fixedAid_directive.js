"use strict"
mainApp.directive("fixedAid", [
    function () {
        var directive = {
            restrict: "E",
            scope: {
                onReady: "=",
            },
            templateUrl: "MyDirectives/PaymentMethod/Templates/FixedAid.html",
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
                    value:"",
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
                    let data = payload.data

                    payload.data.state = {
                        selected: "",
                        disabled: false,
                        updateCurrency: function (value) {
                            console.log("changed in fixed aid to: " + value)
                            payload.context.setCurrency(value)
                        }
                    }

                    if (data.FinancialAid)
                        $scope.scopeModel.value=data.FinancialAid.AidType.AidValue

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
                        $type: "VanriseInternship.FixedAmount, VanriseInternship",
                        AidValue: $scope.scopeModel.value,
                        CurrencyId: currencyAPI.getData()
                    }
                }

                if ($scope.onReady != null && typeof $scope.onReady == "function")
                    $scope.onReady(api)
            }
        }

        return directive
    },
])
