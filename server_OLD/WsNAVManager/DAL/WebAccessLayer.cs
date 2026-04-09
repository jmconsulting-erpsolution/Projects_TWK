using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.OleDb;
using System.Data.SqlClient;
using System.IO;
using System.Linq;
using System.Globalization;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Xml;
using Newtonsoft.Json;
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
        public decimal UpdateVendorLedgerEntry(string documentNo, int blocked)
        {
            string env = ConfigurationManager.AppSettings["ENV_WS"];
            string net_user = ConfigurationManager.AppSettings["WS_User"];
            string net_password = ConfigurationManager.AppSettings["WS_Password"];
            if (env == "THN_DEV")
            {
                WebReferenceTHN_DEV.THN_WS ws = new WebReferenceTHN_DEV.THN_WS();
                ws.PreAuthenticate = true;
                ws.Credentials = new NetworkCredential(net_user, net_password);
                return ws.UpdateVendorLedgerEntry(documentNo, blocked);                
            }
            if (env == "THN_PROD")
            {
                WebReferenceTHN_PROD.THN_WS ws = new WebReferenceTHN_PROD.THN_WS();
                ws.PreAuthenticate = true;
                ws.Credentials = new NetworkCredential(net_user, net_password);
                return ws.UpdateVendorLedgerEntry(documentNo, blocked);
            }

            return -1;
        }
    }

}