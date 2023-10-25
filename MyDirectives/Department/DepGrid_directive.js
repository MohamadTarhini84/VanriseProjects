"use strict"
mainApp.directive("departmentGridDirective", [
    function () {
        var directive = {
            scope: {
                onReady: "=",
                onUpdate: "="
            },
            templateUrl:"MyDirectives/Department/Templates/DepartmentGrid.html",
            controller: function ($scope, $element, $attrs, DepartmentService, DepartmentWebApiService, Pagination) {
                var ctor = new Ctor($scope, $attrs, DepartmentService, DepartmentWebApiService, Pagination)
                ctor.initializeController()
            },
        }

        function Ctor($scope, $attrs, DepartmentService, DepartmentWebApiService, Pagination) {
            this.initializeController = initializeController
            let Departments = []
            let isUniDisabled = false
            let defaultPage = 0
            let currentUni = {}

            function initializeController() {
                $scope.scopeModel = {
                    pageList: [],
                    pageElements: [],
                    pagination:false,
                    ChangePage: ChangePage,
                    EditDepartment: function (id) {
                        DepartmentService.EditDepartment(onDepartmentUpdated, id, isUniDisabled)
                    },
                }

                defineAPI()
            }

            function onDepartmentUpdated(id){
                $scope.onUpdate(currentUni)
            }     

            function defineAPI() {
                let api = {}
                api.load = function (payload) {
                    if (payload.uni) {
                        DepartmentWebApiService.GetDepartmentsInfo(payload.uni.uniID).then((res) => {
                            currentUni=payload.uni
                            let array = res.data
                            for (let item of array) {
                                item["Id"] = item.depID
                                item["Name"] = item.depName
                            }
                            $scope.scopeModel.pageElements = array
                            $scope.selected = payload.uni.uniID
                            isUniDisabled = true
                        })
                    } else if (payload.data) {
                        DepartmentWebApiService.GetFilteredDepartments(payload.data.search).then((res) => {
                            Departments = res.data

                            $scope.scopeModel.pageList = Pagination.getPages(Departments.length)

                            ChangePage(defaultPage)

                            if (payload.data.added)
                                ChangePage($scope.scopeModel.pageList.length - 1)

                            $scope.scopeModel.pagination=true
                        })
                    }
                }

                if ($scope.onReady != null && typeof $scope.onReady == "function")
                    $scope.onReady(api)
            }

            function ChangePage(index) {
                $scope.scopeModel.pageList = Pagination.setPage(
                    $scope.scopeModel.pageList,
                    index
                )

                $scope.scopeModel.currentPage = $scope.scopeModel.pageList[index]

                if ($scope.scopeModel.currentPage) {
                    $scope.scopeModel.pageElements = Departments.slice(
                        $scope.scopeModel.currentPage.from,
                        $scope.scopeModel.currentPage.to
                    )
                }
            }
        }

        return directive
    },
])
