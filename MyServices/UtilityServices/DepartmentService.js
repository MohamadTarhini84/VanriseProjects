"use strict";

mainApp.service('DepartmentService', function (ModalService) {
    this.AddDepartment= function (callback) {
        ModalService.open({
            src: "Department/DepartmentModal.html",
            ctrl: "department_editor_controller",
        }, {
            type: "Add",
            callback
        })
    }
    
    this.EditDepartment = function (callback, id, uni) {
        ModalService.open({
            src: "Department/DepartmentModal.html",
            ctrl: "department_editor_controller"
        }, {
            type: "Edit",
            callback,
            id,
            uni
        })
    }
})