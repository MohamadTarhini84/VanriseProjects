"use strict"
mainApp.directive("currencySelector", [function () {
    var directive = {
        restrict: "E",
        scope: {
            onReady:'='
        },
        templateUrl: "MyDirectives/PaymentMethod/Templates/SelectCurrency.html",
        controller: function ($scope, $element, $attrs, $q, CurrencyEnum) {
            var ctor = new Ctor( $scope, $attrs, $q, CurrencyEnum)
            ctor.initializeController()
        },
    }

    function Ctor( $scope, $attrs, $q, CurrencyEnum) {
        this.initializeController = initializeController
        let context = {}

        function initializeController() {
            $scope.items = {}
            $scope.state = {
                selected: "",
                disabled:false
            }

            $scope.$watch('state.selected', function (newVal) {
                if (newVal != '')
                    $scope.state.updateCurrency(newVal)
            })

            $scope.$on('$destroy', function () {
                context.removeCurrency();
            })

            defineAPI()
        }

        function defineAPI() {
            var api = {}
            api.load = function (payload) {
                let data = payload.data
                
                return loadItemDirective()

                function loadItemDirective() {
                    var loadDeferred = $q.defer()

                    $scope.items = Object.values(CurrencyEnum)
                    context = payload.context

                    $scope.state = data.state

                    if (data.PaymentMethod)
                        $scope.state.selected = data.PaymentMethod.CurrencyId
                    if (data.FinancialAid)                            
                        $scope.state.selected=data.FinancialAid.AidType.CurrencyId                   

                    return loadDeferred.promise
                }
            }
            api.getData = function () {
                return $scope.state.selected
            }
            
            if ($scope.onReady != null && typeof $scope.onReady == "function")
                $scope.onReady(api)
        }
    }

    return directive
}])