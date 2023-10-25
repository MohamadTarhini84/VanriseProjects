"use strict"
mainApp.directive("paymentMethod", [
    function () {
        var directive = {
            scope: {
                onReady: "=",
            },
            templateUrl: "MyDirectives/PaymentMethod/Templates/PaymentMethod.html",
            controller: function ($scope, $element, $attrs, $q, PromisesService) {
                var ctor = new Ctor($scope, $attrs, $q, PromisesService)
                ctor.initializeController()
            },
        }

        function Ctor($scope, $attrs, $q, PromisesService) {
            this.initializeController = initializeController
            let cashAPI, bankAPI
            let cashReadyDefer = $q.defer()
            let bankReadyDefer = $q.defer()
            let globalPayload

            function initializeController() {
                $scope.scopeModel = {
                    payment: "",
                    amount: "",
                    onCashReady: function (api) {
                        cashAPI = api
                        cashReadyDefer.resolve()
                    },
                    onBankReady: function (api) {
                        bankAPI = api
                        bankReadyDefer.resolve()
                    }
                }

                defineAPI()

                $scope.$watch('scopeModel.payment', function () {
                    if ($scope.scopeModel.payment == 'cash') {
                        cashReadyDefer = $q.defer()
                        loadCashDirective(globalPayload)
                    } else {
                        bankReadyDefer = $q.defer()
                        loadBankDirective(globalPayload)
                    }
                })
            }

            function defineAPI() {
                var api = {}
                api.load = function (payload) {
                    let promises = []

                    globalPayload = payload
                    let data = payload.data

                    if ($scope.scopeModel.payment == 'cash') {
                        promises.push(loadCashDirective(payload))
                    } else {
                        promises.push(loadBankDirective(payload))
                    }

                    if (data.PaymentMethod) {
                        $scope.scopeModel.payment = handleTypeString(data.PaymentMethod.$type)
                        $scope.scopeModel.amount = data.PaymentMethod.Amount
                    }

                    return loadItemDirective()
                    function loadItemDirective() {
                        var defer = $q.defer()

                        PromisesService.waitMultiplePromises(promises).then(() => {
                            defer.resolve()
                        })

                        return defer.promise
                    }
                }
                api.getData = function () {
                    let result

                    if ($scope.scopeModel.payment == "cash") {
                        result = cashAPI.getData()
                        result.Amount = $scope.scopeModel.amount
                    } else if ($scope.scopeModel.payment == "bank") {
                        result = bankAPI.getData()
                        result.Amount = $scope.scopeModel.amount
                    }

                    return result
                }
                if ($scope.onReady != null && typeof $scope.onReady == "function") 
                    $scope.onReady(api)
            }

            function loadCashDirective(payload) {
                let defer = $q.defer()

                cashReadyDefer.promise.then(() => {
                    cashAPI.load(payload).then(() => {
                        defer.resolve()
                    })
                })

                return defer.promise
            }
            function loadBankDirective(payload) {
                let defer = $q.defer()

                bankReadyDefer.promise.then(() => {
                    bankAPI.load(payload).then(() => {
                        defer.resolve()
                    })
                })
                return defer.promise
            }

            function handleTypeString(string) {
                return string.split(",")[0].split(".")[1].toLowerCase()
            }
        }

        return directive
    },
])
