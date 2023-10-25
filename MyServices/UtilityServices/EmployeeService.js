"use strict";
mainApp.service('EmployeeService', function (ModalService) {
    this.AddEmployee = function (callback) {
        ModalService.open({
            src: "Employee/EmployeeModal.html",
            ctrl: "employee_editor_controller",
        }, {
            type:"Add",
            callback
        })
    }

    this.EditEmployee = function (callback, id) {
        ModalService.open({
            src: "Employee/EmployeeModal.html",
            ctrl: "employee_editor_controller",
        }, {
            type: "Edit",
            callback,
            id
        })
    }
})