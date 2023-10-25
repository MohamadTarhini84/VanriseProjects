"use strict"

mainApp.controller("employees_controller", EmployeeController)

EmployeeController.$inject = [
    "$scope",
    "$q",
    "EmployeeWebApiService",
    "EmployeeService",
    "Pagination",
]

async function EmployeeController(
    $scope,
    $q,
    EmployeeWebApiService,
    EmployeeService,
    Pagination
) {
    let Employees = []
    defineScope()
    load()

    function defineScope() {
        $scope.scopeModel = {
            pageList: [],
            pageElements: [],
            defaultPage: 0,
            AddEmployee: () => EmployeeService.AddEmployee(onEmployeeAdded),
            EditEmployee: (id) => EmployeeService.EditEmployee(onEmployeeEdited, id),
            ChangePage: ChangePage,
        }
    }

    function load() {
        loadAllControls()
        function loadAllControls() {
            loadStaticData()
            loadData().then(() => {
                ChangePage($scope.scopeModel.defaultPage)
            })

            function loadStaticData() {
                $scope.scopeModel.loadData = function () {
                    let defer = $q.defer()

                    loadData().then(() => {
                        ChangePage($scope.scopeModel.defaultPage)
                        defer.resolve()
                    })

                    return defer.promise
                }
            }

            function loadData() {
                let defer = $q.defer()

                EmployeeWebApiService.GetFilteredEmployees(
                    $scope.scopeModel.search_input
                ).then((res) => {
                    Employees = res.data

                    $scope.scopeModel.pageList = Pagination.getPages(
                        Employees.length
                    )

                    if ($scope.scopeModel.pageList.length == 0) {
                        $scope.scopeModel.pageElements=[]
                    }

                    defer.resolve()
                })

                return defer.promise
            }
        }
    }

    function ChangePage(index) {
        $scope.scopeModel.pageList = Pagination.setPage(
            $scope.scopeModel.pageList,
            index
        )

        $scope.scopeModel.currentPage = $scope.scopeModel.pageList[index]

        if ($scope.scopeModel.currentPage) {
            $scope.scopeModel.pageElements = Employees.slice(
                $scope.scopeModel.currentPage.from,
                $scope.scopeModel.currentPage.to
            )
        }
    }

    function onEmployeeAdded() {
        $scope.scopeModel.loadData().then(() => {
            ChangePage($scope.scopeModel.pageList.length-1)
        })
    }
    
    function onEmployeeEdited(id) {
        $scope.scopeModel.loadData().then(() => {
            let index = Employees.findIndex(employee => employee.ID == id)
            if (index != -1)
                ChangePage($scope.scopeModel.pageList.find(page=>page.from<=index && page.to>index).title-1)
        })
    }
}
