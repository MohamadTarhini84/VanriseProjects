using System;
using System.Collections.Generic;
using System.Web.Http;
using System.Web.Http.Cors;

namespace VanriseInternship.Controllers
{
    public class StudentsController : ApiController
    {
        public StudentManager SM =new StudentManager();

        [EnableCors(origins: "*", headers: "*", methods: "*")]

        [HttpGet]
        public List<Student> GetFilteredStudents(string query)
        {
            return SM.GetFilteredStudents(query??"");
        }

        [HttpGet]
        public List<Student> GetStudentById(string id)
        {
            return SM.GetStudentById(id??"1");
        }

        [HttpGet]
        public List<StudentDetails> GetStudentDetails(string query)
        {
            return SM.GetStudentDetails(query??"");
        }

        [HttpPost]
        public int AddStudent(Student std)
        {
            return SM.AddStudent(std);
        }

        [HttpPost]
        public int EditStudent(Student std)
        {
            return SM.EditStudent(std);
        }
    }
}
