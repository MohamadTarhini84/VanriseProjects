"use strict"

mainApp.service("Pagination", function () {
    this.getPages = function (listSize) {
        const pageSize = 3
        let pageNumber = Math.ceil(listSize / pageSize)
        let pageList = []

        for (let i = 0; i < pageNumber; i++) {
            pageList.push({
                title: i + 1,
                from: i * pageSize,
                to: i * pageSize + pageSize,
                isLast: pageNumber == i + 1 ? true : false,
                isFirst: i == 0 ? true : false,
                isPrevious: false,
                isNext: i == 1 ? true : false,
            })
        }

        return pageList
    }

    this.setPage = function (pageList, i) {
        pageList.forEach((page) => {
            page.isNext = false
            page.isPrevious = false
        })
        
        if(pageList[i]){
            if (!pageList[i].isLast) pageList[i + 1].isNext = true
            if (!pageList[i].isFirst) pageList[i - 1].isPrevious = true
        }
            
        return pageList
    }
})
