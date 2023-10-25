"use strict";

mainApp.service('UniversityService', function (ModalService) {
    this.AddUniversity= function (callback) {
        ModalService.open({
            src: "University/UniversityModal.html",
            ctrl: "university_editor_controller",
        },{
            type: "Add",
            callback
        })
    }

    this.EditUniversity = function (callback, id) {
        ModalService.open({
            src: "University/UniversityModal.html",
            ctrl: "university_editor_controller",
        }, {
            type: "Edit",
            callback,
            id
        })
    }
})