"use strict";
baseEditorController.$inject = ['$scope','$q']

function baseEditorController($scope, $q, ModalService) {
    var itemID;
    var itemAPI;
    var itemReadyDeferred = $q.defer();

    defineScope ();
    loadParameters ();
    load ();

    function loadParameters (){
    // get parameters from scope
    itemID = $scope.itemID;
    }

    function defineScope() {
        // define all needed data/function on scope

        $scope.scopeModel ={}

        $scope.scopeModel.onItemDirectiveReady = function (api){
            itemAPI = api;
            itemReadyDeferred.resolve();
        }
        $scope.scopeModel.closeModal = ModalService.closeModal

        $scope.scopeModel.save = function () {
            // StudentWebApiService.EditStudent(id, name, gender)
        }
    }

    function load() {
        // load all directives and make all web calls
        // synchronize all dependent calls using promises

        function loadAllControls (){
            getEntireItem();
            loadItemDirective();
        }

        function getEntireItem () {
            // return APIService.getEntireItem (itemID);
        }

        function loadItemDirective () {
            // var loadDeferred = $q.defer() ;

            // itemReadyDeferred.promise.then(function () {
            //     // load directive and resolve loadDeferred
            // })

            // return loadDeferred.promise;
        }
        loadAllControls();
    }
}

mainApp.controller ('editor_controller', baseEditorController)