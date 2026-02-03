using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Cors;
using WsNAVManager.DAL;

namespace WsNAVManager.Controllers
{
    [EnableCors(origins: "*", headers: "*", methods: "*")]
    public class NAVController : ApiController
    {

        // GET api/{entry}
        /// <summary>
        /// Metodo GET
        /// URL: api/nav/{key}
        /// Web service di test per passaggio parametri
        /// </summary>
        /// <param name="key">
        /// </param>
        /// <returns>OK se il web service risponde con il valore passato</returns>
        [Route("api/nav/{key}")]
        public object Get(string key)
        {
            string error = "";
            try
            {
                return Ok(key);
            }
            catch (Exception ex)
            {
                Utility.Log("GET api/nav/{key}", ex);
                error = ex.Message;
            }
            return BadRequest(error);
        }


        // GET api/{entry}
        /// <summary>
        /// Metodo GET
        /// URL: api/nav/{key}/{documentNo}/{blocked}
        /// Web service per impostare lo stato "On Hold sui movimenti fornitori
        /// </summary>
        /// <param name="key">
        /// </param>
        /// <param name="documentNo">
        /// </param>
        /// <param name="blocked">
        /// </param>
        /// <returns>OK se il web service risponde con successo</returns>
        [Route("api/nav/{key}/{documentNo}/{blocked}")]
        public object Get(string documentNo, int blocked, string key)
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

                if (documentNo == "")
                {
                    error = "Documento non compilato.";
                    return BadRequest(error);
                }

                DAL.WebAccessLayer wal = new DAL.WebAccessLayer();
                decimal qty = wal.UpdateVendorLedgerEntry(documentNo, blocked);

                return Ok(qty);
            }
            catch (Exception ex)
            {
                Utility.Log("GET api/nav/{key}/{documentNo}/{blocked}", ex);
                error = ex.Message;
            }
            return BadRequest(error);
        }
    }
}
