"use strict";

mainApp.service('StudentService', function (ModalService) {
    this.AddStudent= function (callback) {
        ModalService.open({
            src: "Student/StudentModal.html",
            ctrl: "student_editor_controller",
        }, {
            type:"Add",
            callback
        })
    }

    this.EditStudent = function (callback, id) {
        ModalService.open({
            src: "Student/StudentModal.html",
            ctrl: "student_editor_controller",
        }, {
            type: "Edit",
            callback,
            id
        })
    }
})