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
using System.Net.Mail;
using System.Xml;
using WsNAVManager;

namespace WsNAVManager.DAL
{
    public class DataAccessLayer
    {
        public string username = "";

        public DataAccessLayer()
        {
            this.username = "";
        }

        public DataAccessLayer(HttpRequestMessage request)
        {
            this.username = "";
            try
            {
                var headers = request.Headers;
                if (headers.Contains("token"))
                {
                    string token = headers.GetValues("token").First();
                    this.username = token;
                }
            }
            catch (Exception ex)
            {
                Utility.Log("Authentication", ex);
            }
        }

        public string GetRequestHeaderValue(HttpRequestMessage request, string parameter)
        {
            string ret = "";
            try
            {
                var headers = request.Headers;
                if (headers.Contains(parameter))
                {
                    ret = headers.GetValues(parameter).First();
                }
            }
            catch (Exception ex)
            {
                Utility.Log("GetRequestHeaderValue", ex);
            }
            return ret;
        }

        public bool isAuthenticated()
        {
            return this.username != "";
        }

        /******************************************************************************************/

        #region -------------------------- Log -----------------------------------------------------
        public void log(string title,
            string username,
            string table,
            string key,
            string note,
            string operation
            )
        {

        }
        #endregion

        /******************************************************************************************/

    }

}