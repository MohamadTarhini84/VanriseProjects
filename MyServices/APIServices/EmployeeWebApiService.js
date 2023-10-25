"use strict";

mainApp.service('EmployeeWebApiService', function (WebApiService) {
    this.GetFilteredEmployees = function (query="") {
        return WebApiService.Get(
            "https://localhost:44319/api/Employee/GetFilteredEmployees",
            { query }
        )
    }

    this.AddEmployee = (payload) => {
        return WebApiService.Post(
            "https://localhost:44319/api/Employee/AddEmployee", 
            payload
        )
    }

    this.EditEmployee = (payload) => {
        return WebApiService.Post(
            "https://localhost:44319/api/Employee/EditEmployee", 
            payload
        )
    }

    this.GetEmployeeById = function (id) {
        return WebApiService.Get(
            "https://localhost:44319/api/Employee/GetEmployeeById",
            { id }
        )
    }
})