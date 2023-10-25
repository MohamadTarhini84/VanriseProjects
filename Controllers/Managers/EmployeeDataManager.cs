using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Web;
using Task_Hobbies.Models;

namespace Task_Hobbies.Controllers.Managers
{
    public class EmployeeDataManager: BaseDataManager
    {
        public SerializationManager SM = new SerializationManager();

        public List<Employee> GetFilteredEmployees(string query)
        {
            return GetSPItems<Employee>(HandleReader, "FetchEmployeeData", query);
        }
        
        public Employee GetEmployeeById(long id)
        {
            return GetSPItems<Employee>(HandleReader, "GetEmployeeById", id)[0];
        }

        public int AddEmployee(Employee employee)
        {
            return ExecuteNonQuery(
                    "AddEmployee",
                    employee.Name,
                    SM.SerializeJson<List<Hobby>>(employee.Hobbies),
                    SM.SerializeJson<List<HobbyDetails>>(employee.HobbyDetails)
                );
        }

        public int EditEmployee(Employee employee)
        {
            return ExecuteNonQuery(
                    "EditEmployee",
                    employee.ID,
                    employee.Name,
                    SM.SerializeJson(employee.Hobbies),
                    SM.SerializeJson(employee.HobbyDetails)
                );
        }

        public Employee HandleReader(IDataReader reader)
        {
            return new Employee(
                    (long)reader["employeeID"],
                    (string)reader["employeeName"],
                    SM.DeserializeJson<List<Hobby>>((string)reader["employeeHobbies"]),
                    SM.DeserializeJson<List<HobbyDetails>>((string)reader["employeeDetails"])
                );
        }
    }
}