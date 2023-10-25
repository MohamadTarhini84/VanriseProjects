using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Task_Hobbies.Models
{
    public class Hobby
    {
        public Guid ID { get; set; }
        public string Name { get; set; }

        public Hobby() { }

        public Hobby(Guid id, string name)
        {
            ID = id;
            Name = name;
        }
    }
}