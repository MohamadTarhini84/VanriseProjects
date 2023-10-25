"use strict"

mainApp.service("PromisesService", function ($q) {
    this.waitMultiplePromises = function (promises) {
        let defer = $q.defer()
        let size = promises.length
        let index = 0

        for (let promise of promises) {
            promise.then((res) => {
                index++
                if (index == size) {
                    defer.resolve()
                }
            }).catch((err) => {
                defer.reject(err)
            })
        }

        return defer.promise
    }
})
