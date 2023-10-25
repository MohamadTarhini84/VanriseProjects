"use strict"
mainApp.directive("hobbiesGrid", [
    function () {
        var directive = {
            scope: {
                onReady: "=",
            },
            templateUrl: "MyDirectives/Templates/HobbiesGrid.html",
            controller: function ($scope, $element, $attrs, $q) {
                var ctor = new Ctor($scope, $attrs, $q)
                ctor.initializeController()
            },
        }

        function Ctor($scope, $attrs, $q) {
            this.initializeController = initializeController
            let context = {}
            let employeeForm = {}

            function initializeController() {
                $scope.scopeModel = {
                    Hobbies:[],
                    HobbyLogic: {},
                    updateName: function (hobby) {
                        hobby.touched = true
                        hobby.invalid = true
                        hobby.unique = true
                        employeeForm.$valid = true; employeeForm.$invalid = false;
                        if (this.Hobbies.findIndex(element => element.Name == hobby.NameValue) != -1) {
                            hobby.unique = false
                            hobby.invalid = false
                            employeeForm.$invalid = true; employeeForm.$valid = false;
                        }
                        if (hobby.NameValue) {
                            hobby.invalid = false
                        } else {
                            employeeForm.$invalid = true; employeeForm.$valid = false;
                        }

                        hobby.Name = hobby.NameValue
                    },
                }
                defineAPI()
            }

            function defineAPI() {
                var api = {}
                api.load = function (payload) {
                    context = payload.context
                    employeeForm = payload.form

                    return loadItemDirective()

                    function loadItemDirective() {
                        var loadDeferred = $q.defer()

                        $scope.scopeModel.Hobbies=context.Hobbies
                        $scope.scopeModel.HobbyLogic = context

                        for (let hobby of context.Hobbies) {
                            hobby.NameValue=hobby.Name
                        }

                        loadDeferred.resolve()                        

                        return loadDeferred.promise
                    }
                }

                if ($scope.onReady != null && typeof $scope.onReady == "function")
                    $scope.onReady(api)
            }
        }
        return directive
    },
])
