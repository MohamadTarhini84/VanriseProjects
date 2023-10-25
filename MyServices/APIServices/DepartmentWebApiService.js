"use strict"

mainApp.service("DepartmentWebApiService", function (WebApiService) {
    this.GetFilteredDepartments = function (query = "") {
        return WebApiService.Get(
            "https://localhost:44380/api/Departments/GetDepartmentDetails",
            { query }
        )
    }

    this.AddDepartment = (payload) => {
        return WebApiService.Post(
            "https://localhost:44380/api/Departments/AddDepartment",
            payload
        )
    }

    this.EditDepartment = (payload) => {
        return WebApiService.Post(
            "https://localhost:44380/api/Departments/EditDepartment", 
            payload
        )
    }
    
    this.GetDepartmentById = function (id) {
        return WebApiService.Get(
            "https://localhost:44380/api/Departments/GetDepartmentById",
            { id }
        )
    }
    
    this.GetDepartmentsInfo= function (uniID){
        return WebApiService.Get(
            "https://localhost:44380/api/Departments/GetDepartmentsInfo",
            { uniID }
        )
    }
})
