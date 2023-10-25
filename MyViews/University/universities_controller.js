"use strict"

mainApp.controller("universities_controller", UniversityController)

UniversityController.$inject = [
    "$scope",
    "$q",
    "UniversityWebApiService",
    "UniversityService",
    "Pagination"
]

async function UniversityController(
    $scope,
    $q,
    UniversityWebApiService,
    UniversityService,
    Pagination
) {
    let Universities = []

    defineScope()
    load()


    function defineScope() {
        $scope.scopeModel = {
            pageList: [],
            pageElements: [],
            defaultPage:0,
            items: ["ID", "Name", "Edit"],
            GetFilteredUniversities: function () {
                return UniversityWebApiService.GetFilteredUniversities(
                    $scope.search_input
                )
            },
            onDepEdited: function (uni) {
                uni.api.load({uni})
            },
            AddUniversity: function () {UniversityService.AddUniversity(onUniAdded)},
            EditUniversity: function (event, id) {
                event.stopPropagation()
                UniversityService.EditUniversity(onUniEdited, id)
            },
            ChangePage:ChangePage,
            toggle: toggle
        }
    }

    function load() {
        loadAllControls()
        function loadAllControls() {
            loadStaticData()
            loadData()

            function loadStaticData() {
                $scope.scopeModel.loadData = loadData
            }

            function loadData() {
                $scope.scopeModel.GetFilteredUniversities().then((res) => {
                    Universities = res.data

                    $scope.scopeModel.pageList = Pagination.getPages(Universities.length)

                    ChangePage($scope.scopeModel.defaultPage)
                })
            }
        }
    }

    function toggle(uni) {
        if (!uni.showDepartments) {
            uni.showDepartments = true
            uni.promiseDeferred = $q.defer()

            uni.onReady = function (api) {
                uni.api = api
                uni.promiseDeferred.resolve()
            }

            uni.promiseDeferred.promise.then(() => {
                uni.api.load({ uni })
            })
        } else {
            uni.showDepartments = false
        }
    }

    function ChangePage(index) {
        let promiseDef = $q.defer()

        $scope.scopeModel.pageElements.forEach((uni) => uni.showDepartments=false)
        
        $scope.scopeModel.pageList = Pagination.setPage(
            $scope.scopeModel.pageList,
            index
        )

        $scope.scopeModel.currentPage = $scope.scopeModel.pageList[index]

        if($scope.scopeModel.currentPage){
            $scope.scopeModel.pageElements = Universities.slice(
                $scope.scopeModel.currentPage.from,
                $scope.scopeModel.currentPage.to
            )

            promiseDef.resolve()
        }

        return promiseDef.promise
    }

    function onUniAdded(){
        $scope.scopeModel.GetFilteredUniversities().then((res) => {
            Universities = res.data

            $scope.scopeModel.pageList = Pagination.getPages(
                Universities.length
            )

            ChangePage($scope.scopeModel.pageList.length-1)
        })
    }
    
    function onUniEdited(id){
        $scope.scopeModel.GetFilteredUniversities().then((res) => {
            Universities = res.data

            $scope.scopeModel.pageList = Pagination.getPages(
                Universities.length
            )

            let index = Universities.findIndex(uni => uni.uniID == id)
            if(index!=-1)
                ChangePage($scope.scopeModel.pageList.find(page=>page.from<index && page.to>=index).title-1)
        })
    }

}