using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace VanriseInternship.Controllers
{
	public class BaseDataManager
	{
        private static string conString = "Data Source=DESKTOP-C35LEDF;Initial Catalog=VanrisePhase4;Integrated Security=True";
		
        public int ExecuteNonQuery(string funcName, params object[] inputs)
        {
            try
            {
                SqlConnection con = new SqlConnection(conString);
                SqlCommand command = new SqlCommand(funcName, con);
                command.CommandType = CommandType.StoredProcedure;
                command.Connection.Open();
                SqlCommandBuilder.DeriveParameters(command);

                for (int i = 1; i <= inputs.Length; i ++)
                {
                    command.Parameters[i].Value = inputs[i-1];
                }

                int rows = command.ExecuteNonQuery();
                command.Connection.Close();

                return rows;
            }
            catch (Exception ex)
            {
                Console.WriteLine("An error occurred: " + ex.Message);
                return -1;
            }
        }

		public List<T> GetSPItems<T>(Func<IDataReader, T> handler, string funcName, params object[] inputs)
        {
            List<T> resultData = new List<T>();

            try
            {
                SqlConnection con = new SqlConnection(conString);
                SqlCommand command = new SqlCommand(funcName, con);
                command.CommandType = CommandType.StoredProcedure;
                command.Connection.Open();
                SqlCommandBuilder.DeriveParameters(command);

                for (int i = 1; i <= inputs.Length; i++)
                {
                    command.Parameters[i].Value = inputs[i - 1];
                }

                IDataReader reader= command.ExecuteReader();

                while (reader.Read())
                {
                    resultData.Add(handler(reader));
                }

                command.Connection.Close();
            }
            catch(Exception ex)
            {
                Console.WriteLine("An error occurred: " + ex.Message);
            }

            return resultData;
        }
    }
}
