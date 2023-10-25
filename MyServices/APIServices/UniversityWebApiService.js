"use strict";

mainApp.service('UniversityWebApiService', function (WebApiService) {
    this.GetFilteredUniversities = function (query = "") {
        return WebApiService.Get(
            "https://localhost:44380/api/Universities/GetFilteredUniversities",
            { query }
        )
    }

    this.AddUniversity = (payload) => {
        return WebApiService.Post(
            "https://localhost:44380/api/Universities/AddUniversity", 
            payload
        )
    }

    this.EditUniversity = (payload) => {
        return WebApiService.Post(
            "https://localhost:44380/api/Universities/EditUniversity", 
            payload
        )
    }
    
    this.GetUniversityById = function (id) {
        return WebApiService.Get(
            "https://localhost:44380/api/Universities/GetUniversityById",
            { id }
        )
    }

    this.GetUniversityInfo= function (){
        return WebApiService.Get("https://localhost:44380/api/Universities/GetUniversityInfo")
    }
})