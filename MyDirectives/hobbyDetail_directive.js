"use strict"
mainApp.directive("hobbydetailGrid", [
    function () {
        var directive = {
            scope: {
                onReady: "=",
            },
            templateUrl:"MyDirectives/Templates/HobbyDetailsGrid.html",
            controller: function ($scope, $element, $attrs, $q, PromisesService) {
                var ctor = new Ctor($scope, $attrs, $q, PromisesService)
                ctor.initializeController()
            },
        }

        function Ctor($scope, $attrs, $q, PromisesService) {
            this.initializeController = initializeController
            let context = {}

            function initializeController() {
                $scope.scopeModel = {
                    HobbyDetails:[],
                    DetailsLogic:{}
                }
                defineAPI()
            }

            function defineAPI() {
                var api = {}
                api.load = function (payload) {
                    let promises = []
                    context = payload.context

                    return loadItemDirective()

                    function loadItemDirective() {
                        var loadDeferred = $q.defer()

                        $scope.scopeModel.DetailsLogic = context
                        $scope.scopeModel.HobbyDetails = context.HobbyDetails

                        if (context.HobbyDetails)
                            for (let hobby of context.HobbyDetails) {
                                setupHobby(hobby)
                                promises.push(
                                    hobby.loadHobbySelector(),
                                    hobby.loadFreqSelector()
                                )
                            }

                        PromisesService.waitMultiplePromises(promises).then(() => {
                            loadDeferred.resolve()
                        })                      

                        return loadDeferred.promise
                    }
                }

                if ($scope.onReady != null && typeof $scope.onReady == "function")
                    $scope.onReady(api)
            }

            function setupHobby(hobby) {
                hobby.hobbySelectorDeferred = $q.defer()
                hobby.freqSelectorDeferred = $q.defer()

                hobby.onHobbySelectorReady = function (api) {
                    hobby.hobbyAPI = api
                    hobby.hobbySelectorDeferred.resolve()
                }
                hobby.onFreqSelectorReady = function (api) {
                    hobby.freqAPI = api
                    hobby.freqSelectorDeferred.resolve()
                }
                hobby.loadHobbySelector = function () {
                    let defer = $q.defer()
                    let payload = {
                        context,
                        data: this
                    }

                    hobby.hobbySelectorDeferred.promise.then(() => {
                        hobby.hobbyAPI.load(payload).then(() => {
                            defer.resolve()
                        })
                    })
                    return defer.promise
                }
                hobby.loadFreqSelector = function () {
                    let defer = $q.defer()
                    let payload = {
                        context,
                        data: this
                    }

                    hobby.freqSelectorDeferred.promise.then(() => {
                        hobby.freqAPI.load(payload).then(() => {
                            defer.resolve()
                        })
                    })
                    return defer.promise
                }
            }
        }
        return directive
    },
])
