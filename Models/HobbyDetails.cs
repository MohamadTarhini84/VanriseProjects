using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Task_Hobbies.Models
{
    public class HobbyDetails
    {
        public Guid ID { get; set; }
        public int Frequency { get; set; }
        public FrequencyType FreqType { get; set; }

        public HobbyDetails() { }

        public HobbyDetails(Guid id, int freq, FrequencyType freqType)
        {
            ID = id;
            Frequency = freq;
            FreqType = freqType;
        }
    }

    public enum FrequencyType
    {
        Yearly=1,
        Monthly=2,
        Weekly=3,
        Daily=4
    }
}