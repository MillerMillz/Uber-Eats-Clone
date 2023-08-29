using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using UberEatsAPI.Models;
using UberEatsAPI.Models.DataAccess;
using UberEatsAPI.Models.Repository;

namespace UberEatsAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CourierController : ControllerBase
    {
        private readonly ICourierRepository repository;
        public CourierController(ICourierRepository repository)
        {
            this.repository = repository;
        }
        [HttpPost]
        [Route("AddCourier")]
        public ActionResult<DBCourier> AddCourier(DBCourier dBCourier)
        {
            DBCourier courier = repository.CreateNewCourier(dBCourier);
            return courier;
        }
        [HttpPost]
        [Route("UpdateCourier")]
        public ActionResult<DBCourier> UpdateCourier(DBCourier dBCourier)
        {
            DBCourier courier = repository.UpdateCourier(dBCourier);
            return courier;
        }
        [HttpPost]
        [Route("DeleteCourier")]
        public ActionResult<DBCourier> DeleteCourier(DBCourier dBCourier)
        {
            DBCourier courier = repository.DeleteCourier(dBCourier);
            return courier;
        }
        [HttpGet]
        [Route("GetDbCourierByID/{id}")]
        public ActionResult<DBCourier> GetDbCourierByID(string id)
        {
            DBCourier courier = repository.GetCourierByID(id);
            return courier;
        }
        [HttpGet]
        [Route("GetDbCourier/{id}")]
        public ActionResult<DBCourier> GetDbCourier(int id)
        {
            DBCourier courier = repository.GetCourierByID(id);
            return courier;
        }
    }
}
