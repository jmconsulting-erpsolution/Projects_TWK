using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
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
using System.Xml.Linq;
using WsNAVManager;

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
                Utility.Log(nameof(LoadDataWS), ex);
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

        public async Task<dynamic> TOTEMSoapWS(string functionName, dynamic jsonObj, string company)
        {
            string env = ConfigurationManager.AppSettings["ENV_WS"];
            string totem_user = "";
            string totem_password = "";
            if (company == "TWINPACK")
            {
                totem_user = ConfigurationManager.AppSettings["TWK_Totem_User"];
                totem_password = ConfigurationManager.AppSettings["TWK_Totem_Password"];
            }
            else if (company == "TWINOVA")
            {
                totem_user = ConfigurationManager.AppSettings["TWN_Totem_User"];
                totem_password = ConfigurationManager.AppSettings["TWN_Totem_Password"];
            }

            var client = new NavSoapClient(totem_user, totem_password, company);

            string soapXml = BuildNavSoapEnvelope(functionName, jsonObj);

            string responseXml = await client.CallAsync(
                functionName,
                soapXml
            );

            return responseXml;
        }


        public async Task<dynamic> TOTEMODataWS(string functionName, dynamic jsonObj, string company)
        {
            string env = ConfigurationManager.AppSettings["ENV_WS"];
            string totem_user = "";
            string totem_password = "";
            if (company == "TWINPACK")
            {
                totem_user = ConfigurationManager.AppSettings["TWK_Totem_User"];
                totem_password = ConfigurationManager.AppSettings["TWK_Totem_Password"];
            }
            else if (company == "TWINOVA")
            {
                totem_user = ConfigurationManager.AppSettings["TWN_Totem_User"];
                totem_password = ConfigurationManager.AppSettings["TWN_Totem_Password"];
            }


            var client = new NavODataClient(totem_user, totem_password, company);

            // Se ci sono parametri → query string
            string query = BuildODataQuery(jsonObj);

            JToken response = await client.GetAsync(
                functionName + query
            );

            // Caso tipico NAV: ritorno numerico
            return response;
        }

        private decimal ParseSoapDecimalResult(string soapResponse)
        {
            var doc = XDocument.Parse(soapResponse);

            var value = doc.Descendants()
                .FirstOrDefault(x => x.Name.LocalName == "return_value");

            if (value == null)
                throw new Exception("return_value non trovato nella risposta SOAP");

            return decimal.Parse(value.Value, CultureInfo.InvariantCulture);
        }



        private decimal ParseODataDecimalResult(JToken doc)
        {
            var valueArray = doc["value"] as JArray;

            if (valueArray != null && valueArray.Count > 0)
            {
                var first = valueArray[0] as JObject;

                if (first != null)
                {
                    foreach (var prop in first.Properties())
                    {
                        if (prop.Value.Type == JTokenType.Integer ||
                            prop.Value.Type == JTokenType.Float)
                        {
                            return prop.Value.Value<decimal>();
                        }
                    }
                }
            }

            throw new Exception("Valore numerico non trovato nella risposta OData");
        }




        private string BuildNavSoapEnvelope(string functionName, dynamic jsonObj)
        {
            XNamespace soap = "http://schemas.xmlsoap.org/soap/envelope/";
            XNamespace nav = "urn:microsoft-dynamics-schemas/codeunit/JM_Utility";

            var methodElement = new XElement(nav + functionName);

            // dynamic → JObject sotto il cofano
            foreach (var prop in jsonObj)
            {
                string name = prop.Name;
                string value = Convert.ToString(prop.Value, CultureInfo.InvariantCulture);

                methodElement.Add(
                    new XElement(nav + name, value)
                );
            }

            var envelope = new XDocument(
                new XElement(soap + "Envelope",
                    new XAttribute(XNamespace.Xmlns + "soap", soap),
                    new XElement(soap + "Body", methodElement)
                )
            );

            return envelope.ToString(SaveOptions.DisableFormatting);
        }


        private string BuildODataQuery(dynamic jsonObj)
        {
            if (jsonObj == null)
                return string.Empty;

            var query = new List<string>();

            foreach (var prop in jsonObj)
            {
                string key = prop.Name;
                string value = Uri.EscapeDataString(prop.Value.ToString());
                query.Add($"{key}={value}");
            }

            return "?" + string.Join("&", query);
        }
    }
}


public class NavSoapClient
{
    private readonly HttpClient _client;
    private readonly string _serviceUrl;

    public NavSoapClient(string username, string password, string company)
    {
        if (company == "TWINPACK")
        {
            _serviceUrl =
            ConfigurationManager.AppSettings["TWK_Url"] +
            ConfigurationManager.AppSettings["TWK_SoapPort"] +
            ConfigurationManager.AppSettings["TWK_UrlFolder"] +
            ConfigurationManager.AppSettings["TWK_Soap"] +
            "JM_Utility";
        }
        else if (company == "TWINOVA")
        {
            _serviceUrl =
            ConfigurationManager.AppSettings["TWN_Url"] +
            ConfigurationManager.AppSettings["TWN_SoapPort"] +
            ConfigurationManager.AppSettings["TWN_UrlFolder"] +
            ConfigurationManager.AppSettings["TWN_Soap"] +
            "JM_Utility";
        }

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
    private readonly string _baseUrl;


    public NavODataClient(string username, string password, string company)
    {
        if (company == "TWINPACK")
        {
            _baseUrl =
            ConfigurationManager.AppSettings["TWK_Url"] +
            ConfigurationManager.AppSettings["TWK_ODataPort"] +
            ConfigurationManager.AppSettings["TWK_UrlFolder"] +
            ConfigurationManager.AppSettings["TWK_OData"];
        }
        else if (company == "TWINOVA")
        {
            _baseUrl =
            ConfigurationManager.AppSettings["TWN_Url"] +
            ConfigurationManager.AppSettings["TWN_ODataPort"] +
            ConfigurationManager.AppSettings["TWN_UrlFolder"] +
            ConfigurationManager.AppSettings["TWN_OData"];
        }


        _client = new HttpClient();

        var authBytes = Encoding.ASCII.GetBytes($"{username}:{password}");
        _client.DefaultRequestHeaders.Authorization =
            new AuthenticationHeaderValue("Basic", Convert.ToBase64String(authBytes));

        _client.DefaultRequestHeaders.Accept.Add(
            new MediaTypeWithQualityHeaderValue("application/json"));
    }

    public async Task<JToken> GetAsync(string entity)
    {
        var response = await _client.GetAsync(_baseUrl + entity);

        if (!response.IsSuccessStatusCode)
            throw new Exception(await response.Content.ReadAsStringAsync());

        return JToken.Parse(await response.Content.ReadAsStringAsync());
    }


    public async Task<JToken> PostAsync(string entity, object payload)
    {
        var json = JsonConvert.SerializeObject(payload);
        var content = new StringContent(json, Encoding.UTF8, "application/json");

        var response = await _client.PostAsync(_baseUrl + entity, content);

        var responseContent = await response.Content.ReadAsStringAsync();

        if (!response.IsSuccessStatusCode)
            throw new Exception(responseContent);

        return JToken.Parse(responseContent);
    }

}
