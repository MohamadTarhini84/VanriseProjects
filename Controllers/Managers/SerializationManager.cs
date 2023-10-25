using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Task_Hobbies.Controllers.Managers
{
    public class SerializationManager
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

        public T DeserializeJson<T>(string json)
        {
            return JsonConvert.DeserializeObject<T>(
                json, 
                new JsonSerializerSettings{
                    TypeNameHandling = TypeNameHandling.Objects
                }
            );
        }
    }
}