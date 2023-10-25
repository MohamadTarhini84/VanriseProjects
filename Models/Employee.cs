using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Task_Hobbies.Models
{
    public class Employee
    {
        public long ID { get; set; }
        public string Name { get; set; }
        public List<Hobby> Hobbies { get; set; }
        public List<HobbyDetails> HobbyDetails { get; set; }

        public Employee() { }

        public Employee(long id, string name, List<Hobby> hobbies, List<HobbyDetails> hobbyDetails)
        {
            ID = id;
            Name = name;
            Hobbies = hobbies ?? new List<Hobby>();
            HobbyDetails = hobbyDetails ?? new List<HobbyDetails>();
        }
    }
}