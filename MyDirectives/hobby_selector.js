"use strict"
mainApp.directive("hobbySelector", [function () {
    var directive = {
        restrict: "E",
        scope: {
            onReady: '=',
        },
        templateUrl: "MyDirectives/Templates/SelectHobby.html",
        controller: function ($scope, $element, $attrs, $q) {
            var ctor = new Ctor($scope, $attrs, $q)
            ctor.initializeController()
        },
    }

    function Ctor($scope, $attrs, $q) {
        this.initializeController = initializeController
        let isSelectorReady = false
        let context = {}
        let hobbyDetail = {}

        function initializeController() {
             
            $scope.scopeModel = {
                selected: "",
                Hobbies: [],
                isShowing: function (isSelected, ID, Name) {
                    return !isSelected || ID == $scope.scopeModel.selected.ID
                }
            }

            $scope.$watch('scopeModel.selected.ID', function (newVal, oldVal) {
                if (isSelectorReady) {
                    if (oldVal != '') {
                        let oldHobby = context.Hobbies.find(hob => hob.ID == oldVal)
                        if (oldHobby)
                            oldHobby.isSelected = false
                    }
                    let newHobby = context.Hobbies.find(hob => hob.ID == newVal)
                    if (newHobby)
                        newHobby.isSelected = true
                }
            })

            $scope.$on('$destroy', function () {
                if (hobbyDetail.ID) {
                    let currentHobby = context.Hobbies.find(hob => hob.ID == hobbyDetail.ID)
                    if (currentHobby)
                        currentHobby.isSelected = false
                }
            })

            defineAPI()
        }
        function defineAPI() {
            var api = {}
            api.load = function (payload) {
                context = payload.context
                hobbyDetail = payload.data

                return loadItemDirective()

                function loadItemDirective() {
                    var loadDeferred = $q.defer()

                    $scope.scopeModel.Hobbies=context.Hobbies
                    $scope.scopeModel.selected = hobbyDetail

                    if (payload.data.ID)
                        context.Hobbies.find(hob => hob.ID == hobbyDetail.ID).isSelected = true                    

                    isSelectorReady=true
                    loadDeferred.resolve()

                    return loadDeferred.promise
                }
            }

            if ($scope.onReady != null && typeof $scope.onReady == "function") 
                $scope.onReady(api)
        }
    }

    return directive
}])