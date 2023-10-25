using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace VanriseInternship.Controllers.Managers
{
    public class PaymentManager
    {
        public string SerializeJson<T>(T obj)
        {
            return JsonConvert.SerializeObject(
                obj, 
                new JsonSerializerSettings{
                    TypeNameHandling = TypeNameHandling.Objects
                }
            );
        }

        public object DeserializeJson(string json)
        {
            return JsonConvert.DeserializeObject(
                json, 
                new JsonSerializerSettings{
                    TypeNameHandling = TypeNameHandling.Objects
                }
            );
        }
    }
}