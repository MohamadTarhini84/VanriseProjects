using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using Task_Hobbies.Controllers.Managers;
using Task_Hobbies.Models;
using System.Web.Http.Cors;

namespace Task_Hobbies.Controllers
{
    public class EmployeeController : ApiController
    {
        public EmployeeManager EM = new EmployeeManager();

        [EnableCors(origins: "*", headers: "*", methods: "*")]

        [HttpGet]
        public List<Employee> GetFilteredEmployees(string query)
        {
            return EM.GetFilteredEmployees(query ?? "");
        }

        [HttpGet]
        public Employee GetEmployeeById(long id)
        {
            return EM.GetEmployeeById(id);
        }

        [HttpPost]
        public int AddEmployee(Employee employee)
        {
            return EM.AddEmployee(employee);
        }

        [HttpPost]
        public int EditEmployee(Employee employee)
        {
            return EM.EditEmployee(employee);
        }
    }
}
