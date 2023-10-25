using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using VanriseInternship.Controllers.Managers;

namespace VanriseInternship.Controllers
{
	public class StudentDataManager: BaseDataManager
	{
		public PaymentManager PM = new PaymentManager();
		public List<Student> GetFilteredStudents(string query)
		{
			return GetSPItems<Student>(HandleReader, "FetchData", query);
		}

        public List<Student> GetStudentById(string id)
        {
            return GetSPItems<Student>(HandleReader, "GetStudentById", id);
        }

        public int AddStudent(Student std)
		{
			return ExecuteNonQuery(
				"AddStudent",
                std.studentName,
                (int)std.studentGender,
                std.uniID,
                std.depID,
				PM.SerializeJson<Payment>(std.PaymentMethod),
                PM.SerializeJson<FinancialAid>(std.FinancialAid)
            );
		}

		public int EditStudent(Student std)
		{
            return ExecuteNonQuery(
				"EditStudent", 
				std.studentID,
                std.studentName,
                (int)std.studentGender,
                std.uniID,
                std.depID,
				PM.SerializeJson<Payment>(std.PaymentMethod),
				PM.SerializeJson<FinancialAid>(std.FinancialAid)
			);
        }

		public Student HandleReader(IDataReader reader)
		{
			Student test= new Student(
					(int)reader["studentID"], 
					(string)reader["studentName"], 
					(Gender)reader["studentGender"],
					(int)reader["uniID"],
					(int)reader["depID"],
					(Payment)PM.DeserializeJson((string)reader["PaymentMethod"]),
					(FinancialAid)PM.DeserializeJson((string)reader["FinancialAid"])
				);

            return test;
        }
	}
}