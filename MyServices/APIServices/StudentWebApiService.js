"use strict";

mainApp.service('StudentWebApiService', function (WebApiService) {
    this.GetFilteredStudents = function (query="") {
        return WebApiService.Get(
            "https://localhost:44380/api/Students/GetStudentDetails",
            { query }
        )
    }

    this.AddStudent = (payload) => {
        return WebApiService.Post(
            "https://localhost:44380/api/Students/AddStudent", 
            payload
        )
    }

    this.EditStudent = (payload) => {
        return WebApiService.Post(
            "https://localhost:44380/api/Students/EditStudent", 
            payload
        )
    }

    this.GetStudentById = function (id) {
        return WebApiService.Get(
            "https://localhost:44380/api/Students/GetStudentById",
            { id }
        )
    }
})