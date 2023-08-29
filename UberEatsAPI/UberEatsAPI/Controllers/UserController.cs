using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using UberEatsAPI.Models;
using UberEatsAPI.Models.Repository;

namespace UberEatsAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IUserRepository repository;

        public UserController(IUserRepository _repository)
        {
            repository = _repository;
        }
        [HttpGet]
        [Route("QueryUser/{id}")]
        public ActionResult<DBUser> QueryUser(string id)
        {
            DBUser user = repository.GetUserByID(id);
            return user;
        }
        [HttpGet]
        [Route("QueryUserByID/{id}")]
        public ActionResult<DBUser> QueryUserByID(int id)
        {
            DBUser user = repository.GetUserByID(id);
            return user;
        }
        [HttpPost]
        [Route("AddUser")]
        public ActionResult AddUser(DBUser user)
        {
            repository.CreateNewUser(user);
            return Ok("Success");
        }
        [HttpPost]
        [Route("UpdateUser")]
        public ActionResult UpdateUser(DBUser user)
        {
            repository.UpdateUser(user);
            return Ok("Success");
        }
    }
}
