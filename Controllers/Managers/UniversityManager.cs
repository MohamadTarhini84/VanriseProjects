using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace VanriseInternship.Controllers
{
	public class UniversityManager
	{
        public UniversityDataManager UDM = new UniversityDataManager();
		public List<University> GetFilteredData(string query)
		{
			return UDM.GetFilteredData(query);
		}

        public List<University> GetUniById(string id)
        {
            return UDM.GetUniById(id);
        }

        public List<UniversityInfo> GetUniversityInfo(string query)
        {
            return UDM.GetUniversityInfo(query);
        }

        public int AddUniversity(University uni)
		{
            return UDM.AddUniversity(uni);
		}

		public int EditUniversity(University uni)
		{
            return UDM.EditUniversity(uni);
        }
    }
}