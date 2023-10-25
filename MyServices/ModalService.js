"use strict"

mainApp.service("ModalService", function ($rootScope, $uibModal) {
    this.open = function (config, payload) {

        var newScope = $rootScope.$new()
        newScope.parameters = payload

        newScope.close = function () {
            modalInstance.close()
            newScope.$destroy()
        }

        var modalInstance = $uibModal.open({
            templateUrl: "MyViews/"+config.src,
            scope: newScope,
            controller:config.ctrl,
        })
    }
})
