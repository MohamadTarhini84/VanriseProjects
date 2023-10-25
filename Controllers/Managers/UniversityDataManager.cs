using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace VanriseInternship.Controllers
{
	public class UniversityDataManager: BaseDataManager
	{
		public List<University> GetFilteredData(string query)
		{
			return GetSPItems<University>(HandleReader, "FetchUniData", query);
		}

        public List<University> GetUniById(string id)
        {
            return GetSPItems<University>(HandleReader, "GetUniversityById", id);
        }

        public List<UniversityInfo> GetUniversityInfo(string query)
        {
            return GetSPItems<UniversityInfo>(HandleInfoReader, "FetchUniData", query ?? "");
        }

        public int AddUniversity(University uni)
		{
			return ExecuteNonQuery("AddUniversity", uni.uniName);
		}

		public int EditUniversity(University uni)
		{
            return ExecuteNonQuery("EditUni", uni.uniID, uni.uniName);
        }

		public University HandleReader(IDataReader reader)
		{
			return new University(
					(int)reader["uniID"], 
					(string)reader["uniName"]
                );
        }

        public UniversityInfo HandleInfoReader(IDataReader reader)
        {
            return new UniversityInfo(
                (int)reader["uniID"],
                (string)reader["uniName"]
            );
        }
    }
}