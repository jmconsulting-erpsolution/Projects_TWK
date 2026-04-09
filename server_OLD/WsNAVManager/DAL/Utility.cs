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
using System.Security.Cryptography;
using System.Text;
using System.Xml;

namespace WsNAVManager.DAL
{
    public static class Utility
    {
        public static string strConfigDbConnectionstring = "database_SQL";

        public static string strConfigKey= "key";        

        public static string GetValue(object value)
        {
            string ret = "";
            try
            {
                ret = Convert.ToString(value);
            }
            catch (Exception ex)
            {
                Utility.Log("GetValue", ex);
            }
            return ret;
        }

        public static bool GetValueBool(object value)
        {
            bool ret = false;
            try
            {
                ret = Convert.ToBoolean(value);
            }
            catch (Exception ex)
            {
                Utility.Log("GetValueBool", ex);
            }
            return ret;
        }

        public static int GetValueInt(object value)
        {
            int ret = 0;
            try
            {
                ret = Convert.ToInt32(value);
            }
            catch (Exception ex)
            {
                Utility.Log("GetValue", ex);
            }
            return ret;
        }

        public static decimal GetValueDecimal(object value)
        {
            decimal ret = 0;
            try
            {
                ret = Convert.ToDecimal(value);
            }
            catch (Exception ex)
            {
                Utility.Log("GetValueDecimal", ex);
            }
            return ret;
        }

        public static DateTime GetValueDateTime(object value)
        {
            DateTime ret = DateTime.MinValue;
            try
            {
                ret = Convert.ToDateTime(value);
            }
            catch (Exception ex)
            {
                Utility.Log("GetValueDateTime", ex);
            }
            return ret;
        }

        public static DateTime? GetValueDateTimeNull(object value)
        {
            DateTime? ret = null;
            try
            {
                ret = Convert.ToDateTime(value);
            }
            catch (Exception ex)
            {
                Utility.Log("GetValueDateTimeNull", ex);
            }
            return ret;
        }

        public static string CalculateMD5Hash(string input)
        {
            // step 1, calculate MD5 hash from input

            MD5 md5 = System.Security.Cryptography.MD5.Create();

            byte[] inputBytes = System.Text.Encoding.ASCII.GetBytes(input);

            byte[] hash = md5.ComputeHash(inputBytes);

            // step 2, convert byte array to hex string

            StringBuilder sb = new StringBuilder();

            for (int i = 0; i < hash.Length; i++)
            {
                sb.Append(hash[i].ToString("X2"));
            }

            return sb.ToString();
        }

        public static string GetShortType(string type)
        {
            string ret = "";
            try
            {
                if (type.Length > 0)
                    ret = type.Substring(0, 1);
            }
            catch (Exception ex)
            {
                Utility.Log("GetShortType", ex);
            }
            return ret;
        }

        public static void Log(string func, Exception ex, string user = "")
        {
            try
            {
                string file = GetLogFileName();
                string log = DateTime.Now.ToString("yyyy-MM-dd hh:mm:ss") + " - FUNCTION: " + func + " --- USER: " + user + "\r\n";
                if (ex != null)
                {
                    log += "ERRORE: " + ex.Message + "\r\n";
                    if (ex.InnerException != null)
                    {
                        log += "DETTAGLIO: " + ex.InnerException.Message + "\r\n";
                        if (ex.InnerException.InnerException != null)
                            log += ex.InnerException.InnerException.Message + "\r\n";
                    }
                }
                log += "------------------------------------------------------------------------------------" + "\r\n";
                File.AppendAllText(file, log);
            }
            catch (Exception exc)
            {
                Utility.Log(nameof(Log), exc);
            }
        }

        public static void LogString(string func, string message, string user = "")
        {
            try
            {
                string file = GetLogFileName();
                string log = DateTime.Now.ToString("yyyy-MM-dd hh:mm:ss") + " - FUNCTION: " + func + " --- USER: " + user + "\r\n";
                if (message != "")
                {
                    log += "MESSAGE: " + message + "\r\n";
                }
                log += "------------------------------------------------------------------------------------" + "\r\n";
                File.AppendAllText(file, log);
            }
            catch (Exception exc)
            {
                Utility.Log(nameof(Log), exc);
            }
        }


        private static string GetLogFileName()
        {
            string fileName = DateTime.Now.ToString("yyyyMMdd") + ".log";
            string path = "";
            try
            {
                path = ConfigurationManager.AppSettings["LogPath"].ToString();
                if (!Directory.Exists(path))
                    Directory.CreateDirectory(path);
            }
            catch (Exception ex)
            {
                Utility.Log(nameof(GetLogFileName), ex);
            }
            return path + fileName;
        }
    }
    
}