using Student_Data_Management_App_v2.Models;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Security.Cryptography.X509Certificates;

namespace VanriseInternship.Controllers
{
    public class DepartmentManager
    {
        DepartmentDataManager DDM = new DepartmentDataManager();

        public List<Department> GetFilteredDepartments(string query)
        {
            return DDM.GetFilteredDepartments(query);
        }

        public List<Department> GetDepartmentById(string id)
        {
            return DDM.GetDepartmentById(id);
        }

        public List<DepartmentDetails> GetDepartmentDetails(string query)
        {
            List<Department> deps = DDM.GetFilteredDepartments(query ?? "");
            return MapDepartments(deps);
        }

        public List<DepartmentInfo> GetDepInfo(string uniID)
        {
            return DDM.GetDepInfo(uniID);
        }

        public int AddDepartment(Department dep)
        {
            return DDM.AddDepartment(dep);
        }

        public int EditDepartment(Department dep)
        {
            return DDM.EditDepartment(dep);
        }

        public List<DepartmentDetails> MapDepartments(List<Department> deps)
        {
            UniversityDataManager UDM = new UniversityDataManager();
            List<UniversityInfo> unis = UDM.GetUniversityInfo("");

            List<DepartmentDetails> result=new List<DepartmentDetails>();

            Dictionary<int, string> UniDict = unis.ToDictionary(uni=>uni.Id, uni=>uni.Name);

            foreach (Department dep in deps)
            {
                result.Add(new DepartmentDetails(dep, UniDict[dep.uniID]));
            }

            return result;
        }
    }
}
