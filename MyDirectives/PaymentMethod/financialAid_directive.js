"use strict"
mainApp.directive("financialAid", [
    function () {
        var directive = {
            scope: {
                onReady: "=",
            },
            templateUrl: "MyDirectives/PaymentMethod/Templates/financialAid.html",
            controller: function ($scope, $element, $attrs, $q, PromisesService) {
                var ctor = new Ctor($scope, $attrs, $q, PromisesService)
                ctor.initializeController()
            },
        }

        function Ctor($scope, $attrs, $q, PromisesService) {
            this.initializeController = initializeController
            let fixedAPI, percentageAPI
            let fixedReady = $q.defer()
            let percentageReady = $q.defer()

            function initializeController() {
                $scope.scopeModel = {
                    name: "",
                    type:"",
                    onFixedReady: function (api) {
                        fixedAPI = api
                        fixedReady.resolve()
                    },
                    onPercentageReady: function (api) {
                        percentageAPI = api
                        percentageReady.resolve()
                    }
                }

                defineAPI()
            }

            function defineAPI() {
                let api = {}
                api.load = function (payload) {
                    let data = payload.data

                    if (data.FinancialAid) {
                        $scope.scopeModel.type = handleTypeString(data.FinancialAid.AidType.$type)
                        $scope.scopeModel.name = data.FinancialAid.FinancerName
                    }

                    let promises = [
                        loadFixedDirective(),
                        loadPercentageDirective()
                    ]

                    $scope.$watch('scopeModel.type', function () {
                        promises = [
                            loadFixedDirective(),
                            loadPercentageDirective()
                        ]
                        loadItemDirective()
                    })

                    return loadItemDirective()
                    function loadItemDirective() {
                        var defer = $q.defer()

                        PromisesService.waitMultiplePromises(promises).then(() => {
                            defer.resolve()
                        })

                        return defer.promise
                    }
                    function loadFixedDirective() {
                        let defer = $q.defer()

                        fixedReady.promise.then(() => {
                            fixedAPI.load(payload).then(() => {
                                defer.resolve()
                            })
                        })

                        return defer.promise
                    }
                    function loadPercentageDirective() {
                        let defer = $q.defer()

                        percentageReady.promise.then(() => {
                            percentageAPI.load(payload).then(() => {
                                defer.resolve()
                            })
                        })
                        return defer.promise
                    }
                }
                api.getData = function () {
                    let result = {}

                    if ($scope.scopeModel.type == "percentage") {
                        result.$type= "VanriseInternship.FinancialAid, VanriseInternship"
                        result.AidType = percentageAPI.getData()
                        result.FinancerName = $scope.scopeModel.name
                    } else {
                        result.$type= "VanriseInternship.FinancialAid, VanriseInternship"
                        result.AidType = fixedAPI.getData()
                        result.FinancerName = $scope.scopeModel.name
                    }

                    return result
                }

                if ($scope.onReady != null && typeof $scope.onReady == "function")
                    $scope.onReady(api)                
            }

            function handleTypeString(string) {
                return string.split(",")[0].split(".")[1].toLowerCase()
            }
        }
        return directive
    },
])
