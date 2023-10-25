using System.Collections.Generic;
using System.Data;
using System.Web.Http;

namespace VanriseInternship.Controllers
{
    public class UniversitiesController : ApiController
    {
        public UniversityManager UM = new UniversityManager();

        [HttpGet]
        public List<University> GetFilteredUniversities(string query)
        {
            return UM.GetFilteredData(query??"");
        }

        [HttpGet]
        public List<University> GetUniversityById(string id)
        {
            return UM.GetUniById(id??"1");
        }

        [HttpGet]
        public List<UniversityInfo> GetUniversityInfo(string query = "")
        {
            return UM.GetUniversityInfo(query);
        }

        [HttpPost]
        public int AddUniversity(University uni)
        {
            return UM.AddUniversity(uni);
        }

        [HttpPost]
        public int EditUniversity(University uni)
        {
            return UM.EditUniversity(uni);
        }
    }
}
