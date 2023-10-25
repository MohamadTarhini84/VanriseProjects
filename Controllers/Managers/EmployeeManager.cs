using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Web;
using Task_Hobbies.Models;

namespace Task_Hobbies.Controllers.Managers
{
    public class EmployeeManager
    {
        public EmployeeDataManager EDM = new EmployeeDataManager();

        public List<Employee> GetFilteredEmployees(string query)
        {
            return EDM.GetFilteredEmployees(query);
        }

        public Employee GetEmployeeById(long id)
        {
            return EDM.GetEmployeeById(id);
        }

        public int AddEmployee(Employee employee)
        {
            return EDM.AddEmployee(employee);
        }

        public int EditEmployee(Employee employee)
        {
            return EDM.EditEmployee(employee);
        }
    }
}