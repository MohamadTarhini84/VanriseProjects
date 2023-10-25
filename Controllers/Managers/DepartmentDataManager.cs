using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Student_Data_Management_App_v2.Models;
using System.Collections;

namespace VanriseInternship.Controllers
{
    public class DepartmentDataManager : BaseDataManager
    {
        public List<Department> GetFilteredDepartments(string query)
        {
            return GetSPItems<Department>(HandleReader, "FetchDepData", query);
        }

        public List<Department> GetDepartmentById(string id)
        {
            return GetSPItems<Department>(HandleReader, "GetDepartmentById", id);
        }

        public List<DepartmentInfo> GetDepInfo(string uniID)
        {
            return GetSPItems<DepartmentInfo>(HandleInfoReader, "FetchDepInfoByID", uniID);
        }

        public int AddDepartment(Department dep)
		{
			return ExecuteNonQuery(
				"AddDepartment", 
				dep.depName, 
				dep.uniID
            );
		}

		public int EditDepartment(Department dep)
		{
            return ExecuteNonQuery(
                "EditDepartment", 
				dep.depID, 
				dep.depName, 
				dep.uniID
            );
        }

		public Department HandleReader(IDataReader reader)
		{
			return new Department(
					(int)reader["depID"], 
					(string)reader["depName"], 
					(int)reader["uniID"]
                );
        }

        public DepartmentInfo HandleInfoReader(IDataReader reader)
        {
            return new DepartmentInfo(
                (int)reader["depID"],
                (string)reader["depName"],
                (int)reader["uniID"]
            );
        }
    }
}