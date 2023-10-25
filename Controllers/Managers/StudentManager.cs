using System.Collections;
using System.Collections.Generic;
using System.Linq;
using VanriseInternship.Controllers.Managers;

namespace VanriseInternship.Controllers
{
    public class StudentManager
    {
        public StudentDataManager SDM= new StudentDataManager();
        public PaymentManager PM = new PaymentManager();

        public List<Student> GetFilteredStudents(string query)
        {
            return SDM.GetFilteredStudents(query);
        }

        public List<Student> GetStudentById(string id)
        {
            return SDM.GetStudentById(id);
        }

        public List<StudentDetails> GetStudentDetails(string query)
        {
            List<Student> students = SDM.GetFilteredStudents(query ?? "");
            return MapDepartments(students);
        }

        public int AddStudent(Student std)
        {
            return SDM.AddStudent(std); 
        }

        public int EditStudent(Student std)
        {
            return SDM.EditStudent(std);
        }

        public List<StudentDetails> MapDepartments(List<Student> students)
        {
            UniversityDataManager UDM = new UniversityDataManager();
            DepartmentDataManager DDM = new DepartmentDataManager();

            List<UniversityInfo> unis = UDM.GetUniversityInfo("");
            List<Department> deps = DDM.GetFilteredDepartments("");

            List<StudentDetails> result = new List<StudentDetails>();

            Dictionary<int, string> UniDict = unis.ToDictionary(uni => uni.Id, uni => uni.Name);
            Dictionary<int, string> DepDict = deps.ToDictionary(dep => dep.depID, dep => dep.depName);

            foreach (Student std in students)
            {
                result.Add(new StudentDetails(std, UniDict[std.uniID], DepDict[std.depID]));
            }

            return result;
        }
    }
}