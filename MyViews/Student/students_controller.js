"use strict"

mainApp.controller("students_controller", StudentController)

StudentController.$inject = [
    "$scope",
    "StudentWebApiService",
    "StudentService",
    "Pagination",
]

async function StudentController(
    $scope,
    StudentWebApiService,
    StudentService,
    Pagination
) {
    let students= []
    defineScope()
    load()

    function defineScope() {
        $scope.scopeModel = {
            pageList: [],
            pageElements: [],
            defaultPage: 0,
            items: ["ID", "Name", "Gender", "University", "Department", "Edit"],
            GetFilteredStudents: function () {
                return StudentWebApiService.GetFilteredStudents(
                    $scope.search_input
                )
            },
            AddStudent: ()=>StudentService.AddStudent(onStudentAdded),
            EditStudent: (id)=>StudentService.EditStudent(onStudentEdited, id),
            ChangePage: ChangePage,
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
                $scope.scopeModel.GetFilteredStudents().then((res) => {
                    students = res.data

                    $scope.scopeModel.pageList = Pagination.getPages(
                        students.length
                    )

                    ChangePage($scope.scopeModel.defaultPage)
                })
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
            $scope.scopeModel.pageElements = students.slice(
                $scope.scopeModel.currentPage.from,
                $scope.scopeModel.currentPage.to
            )
        }
    }

    function onStudentAdded(){
        $scope.scopeModel.GetFilteredStudents().then((res) => {
            students = res.data

            $scope.scopeModel.pageList = Pagination.getPages(
                students.length
            )

            ChangePage($scope.scopeModel.pageList.length-1)
        })
    }
    
    function onStudentEdited(id){
        $scope.scopeModel.GetFilteredStudents().then((res) => {
            students = res.data

            $scope.scopeModel.pageList = Pagination.getPages(
                students.length
            )

            let index = students.findIndex(std => std.Id == id)
            if (index != -1)
                ChangePage($scope.scopeModel.pageList.find(page=>page.from<=index && page.to>index).title-1)
        })
    }
}
