"use strict"
app.directive("baseDirective", [
    function () {
        var directive = {
            scope: {
                onReady: "=",
            },
            controller: function ($scope, $element, $attrs) {
                var ctrl = this
                var ctor = new Ctor(ctrl, $scope, $attrs)
                ctor.initializeController()
            },
            //Read About: restrict, controllerAs, bindtoController, compile, templateUrl. Then make needed changes on this object
        }

        function Ctor(ctrl, $scope, $attrs) {
            this.initializeController = initializeController
            var itemAPI
            var itemReadyDeferred = $q.defer()
            function initializeController() {
                $scope.scopeModel = {}
                $scope.scopeModel.onItemDirectiveReady = function (api) {
                    itemAPI = api
                    itemReadyDeferred.resolve()
                }
                defineAPI()
            }

            function defineAPI() {
                var api = {}
                api.load = function (payload) {
                    var promises = []
                    // add all load promises to this array
                    var data = payload.data
                    // extract data from payload
                    loadItemDirective()

                    function loadItemDirective() {
                        var loadDeferred = $q.defer()
                        itemReadyDeferred.promise.then(function () {
                            // load directive and resolve loadDeferred
                        })

                        return loadDeferred.promise
                    }
                    //return wait all promises
                }
                api.getData = function () {
                    // return data
                }
                if (ctrl.onReady != null && typeof ctrl.onReady == "function")
                    ctrl.onReady(api)
            }
        }
        return directive
    },
])
