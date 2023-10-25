"use strict";

mainApp.service('WebApiService', function ($http) {
    this.Get = function (URL, parameters = {}) {

        return $http.get(URL, {
            method: "GET",
            params: parameters
        })
    }

    this.Post = (URL, parameters) => {
        return $http.post(URL, parameters)

    }
})