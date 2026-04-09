using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.OleDb;
using System.Data.SqlClient;
using System.Globalization;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text;
using System.Threading.Tasks;
using System.Xml;
using System.Text.Json;
using WsNAVManager;
using JsonSerializer = System.Text.Json.JsonSerializer;

namespace WsNAVManager.DAL
{
    public class WebAccessLayer
    {
        public Guid token = Guid.Empty;
        private static readonly HttpClient client = new HttpClient();

        public WebAccessLayer()
        {
            this.token = Guid.Empty;
        }


        public object GetWsList(string entity)
        {
            try
            {
                /*
                List<dynamic> list = new List<dynamic>();
                string url = ConfigurationManager.AppSettings[Utility.strConfigCrmUrlBase] +
                             ConfigurationManager.AppSettings[Utility.strConfigCrmUrlApiAnagrafica];
                var response = client.GetAsync(url).Result;
                var results = response.Content.ReadAsStringAsync().Result;
                */
                string results = LoadDataWS(entity);
                return results;
            }
            catch (Exception ex)
            {
                Utility.Log("GetWsList", ex);
            }
            return null;
        }


        private string LoadDataWS(string table)
        {
            List<dynamic> list = new List<dynamic>();
            string outstring = "";
            try
            {
                string env = ConfigurationManager.AppSettings["ENV_WS"];
                string entity = ConfigurationManager.AppSettings[env + table];

                string link = ConfigurationManager.AppSettings[env] + entity;
                string user = ConfigurationManager.AppSettings["WS_User"];
                string password = ConfigurationManager.AppSettings["WS_Password"];

                var request = HttpWebRequest.Create(link);
                request.ContentType = "application/json";
                request.Credentials = new NetworkCredential(user, password);
                request.Method = "GET";

                using (HttpWebResponse response = request.GetResponse() as HttpWebResponse)
                {
                    if (response.StatusCode != HttpStatusCode.OK)
                        Console.Out.WriteLine("Error fetching data. Server returned status code: {0}", response.StatusCode);
                    using (StreamReader reader = new StreamReader(response.GetResponseStream()))
                    {
                        var content = reader.ReadToEnd();
                        if (string.IsNullOrWhiteSpace(content))
                        {
                            Console.Out.WriteLine("Response contained empty body...");
                        }
                        else
                        {
                            outstring = DeserializeList(content);
                        }

                    }
                }
                /*
                int index = 0;
                foreach (string code in listCodes)
                {
                    comboBox1.Items.Add(code + "    |    " + listDescription[index]);
                    index++;
                }
                */
            }
            catch (Exception ex)
            {
                Utility.Log(nameof(LoadDataWS),ex);
            }
            return outstring;
        }

        public string DeserializeList(string text)
        {
            XmlDocument xml = new XmlDocument();
            xml.LoadXml(text);

            string json = JsonConvert.SerializeXmlNode(xml);
            return json;        
        }
        public decimal ChangeServiceReportWSToStatus(int toStatus, string reportHeaderNo)
        {
            string env = ConfigurationManager.AppSettings["ENV_WS"];
            string net_user = ConfigurationManager.AppSettings["WS_User"];
            string net_password = ConfigurationManager.AppSettings["WS_Password"];
            if (env == "TWK_DEV")
            {
                WebReferenceTWK_DEV.ServiceReport ws = new WebReferenceTWK_DEV.ServiceReport();
                ws.PreAuthenticate = true;
                ws.Credentials = new NetworkCredential(net_user, net_password);
                return ws.ChangeServiceReportWSToStatus(toStatus, reportHeaderNo);                
            }
            if (env == "TWK_PROD")
            {
                WebReferenceTWK_PROD.ServiceReport ws = new WebReferenceTWK_PROD.ServiceReport();
                ws.PreAuthenticate = true;
                ws.Credentials = new NetworkCredential(net_user, net_password);
                return ws.ChangeServiceReportWSToStatus(toStatus, reportHeaderNo);
            }

            return -1;
        }

        public decimal ChangeServiceReportTOTEMWSToStatus(int toStatus)
        {
            string env = ConfigurationManager.AppSettings["ENV_WS"];
            string net_user = ConfigurationManager.AppSettings["WS_User"];
            string net_password = ConfigurationManager.AppSettings["WS_Password"];
            if (env == "TWK_DEV")
            {
                WebReferenceTWK_DEV.ServiceReport ws = new WebReferenceTWK_DEV.ServiceReport();
                ws.PreAuthenticate = true;
                ws.Credentials = new NetworkCredential(net_user, net_password);
                //return ws.ChangeServiceReportWSToStatus(toStatus, reportHeaderNo);
            }
            if (env == "TWK_PROD")
            {
                WebReferenceTWK_PROD.ServiceReport ws = new WebReferenceTWK_PROD.ServiceReport();
                ws.PreAuthenticate = true;
                ws.Credentials = new NetworkCredential(net_user, net_password);
                //return ws.ChangeServiceReportWSToStatus(toStatus, reportHeaderNo);
            }

            return -1;
        }
    }


    public class NavSoapClient
    {
        private readonly HttpClient _client;
        private readonly string _serviceUrl =
            "http://tpnav18app.twinpack.local:7067/TWK_PRINT_DEV/WS/TWINPACK/Codeunit/JM_Utility";

        public NavSoapClient(string username, string password)
        {
            _client = new HttpClient();

            var authBytes = Encoding.ASCII.GetBytes($"{username}:{password}");
            _client.DefaultRequestHeaders.Authorization =
                new AuthenticationHeaderValue("Basic", Convert.ToBase64String(authBytes));
        }

        public async Task<string> CallAsync(string soapAction, string soapXml)
        {
            var content = new StringContent(soapXml, Encoding.UTF8, "text/xml");

            content.Headers.Clear();
            content.Headers.Add("Content-Type", "text/xml; charset=utf-8");

            _client.DefaultRequestHeaders.Remove("SOAPAction");
            _client.DefaultRequestHeaders.Add("SOAPAction",
                $"urn:microsoft-dynamics-schemas/codeunit/JM_Utility:{soapAction}");

            var response = await _client.PostAsync(_serviceUrl, content);
            var responseText = await response.Content.ReadAsStringAsync();

            if (!response.IsSuccessStatusCode)
                throw new Exception($"SOAP ERROR {response.StatusCode}\n{responseText}");

            return responseText;
        }
    }


    public class NavODataClient
    {
        private readonly HttpClient _client;
        private readonly string _baseUrl =
            "http://tpnav18app.twinpack.local:7068/TWK_PRINT_DEV/OData/Company('TWINPACK')/";

        public NavODataClient(string username, string password)
        {
            _client = new HttpClient();

            var authBytes = Encoding.ASCII.GetBytes($"{username}:{password}");
            _client.DefaultRequestHeaders.Authorization =
                new AuthenticationHeaderValue("Basic", Convert.ToBase64String(authBytes));

            _client.DefaultRequestHeaders.Accept.Add(
                new MediaTypeWithQualityHeaderValue("application/json"));
        }

        public async Task<JsonDocument> GetAsync(string entity)
        {
            var response = await _client.GetAsync(_baseUrl + entity);

            if (!response.IsSuccessStatusCode)
                throw new Exception(await response.Content.ReadAsStringAsync());

            return JsonDocument.Parse(await response.Content.ReadAsStringAsync());
        }

        public async Task<JsonDocument> PostAsync(string entity, object payload)
        {
            var json = JsonSerializer.Serialize(payload);
            var content = new StringContent(json, Encoding.UTF8, "application/json");

            var response = await _client.PostAsync(_baseUrl + entity, content);

            if (!response.IsSuccessStatusCode)
                throw new Exception(await response.Content.ReadAsStringAsync());

            return JsonDocument.Parse(await response.Content.ReadAsStringAsync());
        }
    }

}