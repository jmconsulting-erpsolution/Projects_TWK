using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;
using System.Web.Http.Cors;
using WsNAVManager.DAL;

namespace WsNAVManager.Controllers
{
    [EnableCors(origins: "*", headers: "*", methods: "*")]
    public class TOTEMController : ApiController
    {
        // GET api/{entry}
        /// <summary>
        /// Metodo GET
        /// URL: api/nav/totemjobs/{key}/{company}
        /// Web service per scaricare la lista delle commesse
        /// </summary>
        /// <param name="key">
        /// </param>
        /// <returns>OK se il web service risponde con successo</returns>
        [Route("api/nav/totemjobs/{key}/{company}")]
        public async Task<object> GetTotemJobs(string key, string company)
        {
            string error = "";
            try
            {
                string authKey = Utility.GetValue(ConfigurationManager.AppSettings[Utility.strConfigKey]);

                DAL.DataAccessLayer dal = new DAL.DataAccessLayer(Request);

                if (key != authKey)
                {
                    return Unauthorized();
                }
                var filters = "";
                DAL.WebAccessLayer wal = new DAL.WebAccessLayer();
                dynamic response = await wal.TOTEMODataWS("TotemJobs", filters, company);

                return Ok(response);
            }
            catch (Exception ex)
            {
                Utility.Log("GET api/nav/totemjobs/{key}/{company}", ex);
                error = ex.Message;
            }
            return BadRequest(error);
        }


        // POST api/{entry}
        /// <summary>
        /// Metodo POST
        /// URL: api/nav/checktotemresource/{key}/{company}
        /// Web service per accedere tramite la risorsa
        /// </summary>
        /// <returns>OK se il web service risponde con successo</returns>
        [Route("api/nav/checktotemresource/{key}/{company}")]
        public async Task<object> PostCheckTotemResource(string key, string company, [FromBody] object jsonData)
        {
            string error = "";
            try
            {
                string authKey = Utility.GetValue(ConfigurationManager.AppSettings[Utility.strConfigKey]);
                dynamic json = jsonData;

                DAL.DataAccessLayer dal = new DAL.DataAccessLayer(Request);

                if (key != authKey)
                {
                    return Unauthorized();
                }

                DAL.WebAccessLayer wal = new DAL.WebAccessLayer();
                dynamic response = await wal.TOTEMSoapWS("CheckTotemResource", json, company);

                return Ok(response);
            }
            catch (Exception ex)
            {
                Utility.Log("GET api/nav/checktotemresource/{key}/{company}", ex);
                error = ex.Message;
            }
            return BadRequest(error);
        }



        // POST api/{entry}
        /// <summary>
        /// Metodo POST
        /// URL: api/nav/inserttotemactivity/{key}/{company}
        /// Web service per le ore lavorate sulla commessa
        /// </summary>
        /// <returns>OK se il web service risponde con successo</returns>
        [Route("api/nav/inserttotemactivity/{key}/{company}")]
        public async Task<object> PostInsertTotemActivity(string key, string company, [FromBody] object jsonData)
        {
            string error = "";
            try
            {
                string authKey = Utility.GetValue(ConfigurationManager.AppSettings[Utility.strConfigKey]);
                dynamic json = jsonData;

                DAL.DataAccessLayer dal = new DAL.DataAccessLayer(Request);

                if (key != authKey)
                {
                    return Unauthorized();
                }

                DAL.WebAccessLayer wal = new DAL.WebAccessLayer();
                dynamic response = await wal.TOTEMSoapWS("InsertTotemActivity", json, company);

                return Ok(response);
            }
            catch (Exception ex)
            {
                Utility.Log("GET api/nav/inserttotemactivity/{key}/{company}", ex);
                error = ex.Message;
            }
            return BadRequest(error);
        }
    }
}
