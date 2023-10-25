using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http.Headers;
using System.Runtime.Remoting.Lifetime;
using System.Web.Http;
using System.Web.Http.Cors;


namespace VanriseInternship
{
    public static class WebApiConfig
    {
        public static void Register(HttpConfiguration config)
        {
            // Web API configuration and services

            // Web API routes
            config.MapHttpAttributeRoutes();

            config.Routes.MapHttpRoute(
                name: "DefaultApi",
                routeTemplate: "api/{controller}/{action}/{id}",
                defaults: new { id = RouteParameter.Optional }
            );

            config.EnableCors();

            config.Formatters.Remove(config.Formatters.XmlFormatter);

            var json_frmt = config.Formatters.JsonFormatter;

            json_frmt.SupportedMediaTypes.Add(new MediaTypeHeaderValue("application/json"));
            json_frmt.SerializerSettings.TypeNameHandling = Newtonsoft.Json.TypeNameHandling.Objects;
            json_frmt.SerializerSettings.DateTimeZoneHandling = DateTimeZoneHandling.Unspecified;
        }
    }
}
