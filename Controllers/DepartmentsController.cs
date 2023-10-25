using Student_Data_Management_App_v2.Models;
using System.Collections.Generic;
using System.Data;
using System.Web.Http;

namespace VanriseInternship.Controllers
{
    public class DepartmentsController : ApiController
    {
        public DepartmentManager DM = new DepartmentManager();

        [HttpGet]
        public List<Department> GetFilteredDepartments(string query)
        {
            return DM.GetFilteredDepartments(query??"");
        }

        [HttpGet]
        public List<Department> GetDepartmentById(string id)
        {
            return DM.GetDepartmentById(id??"");
        }

        [HttpGet]
        public List<DepartmentDetails> GetDepartmentDetails(string query)
        {
            return DM.GetDepartmentDetails(query??"");
        }

        [HttpGet]
        public List<DepartmentInfo> GetDepartmentsInfo(string uniID)
        {
            return DM.GetDepInfo(uniID ?? "1");
        }

        [HttpPost]
        public int AddDepartment(Department dep)
        {
            return DM.AddDepartment(dep);
        }

        [HttpPost]
        public int EditDepartment(Department dep)
        {
            return DM.EditDepartment(dep);
        }
    }
}
