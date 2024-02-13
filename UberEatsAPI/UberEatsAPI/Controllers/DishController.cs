using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using UberEatsAPI.Models;
using UberEatsAPI.Models.CustomModel;
using UberEatsAPI.Models.Repository;

namespace UberEatsAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DishController : ControllerBase
    {
        private readonly IDishRepository repository;
        private readonly IWebHostEnvironment HostEnvironment;
        private readonly IRestuarantRepository restuarantRepository;

        public DishController(IDishRepository repository, IWebHostEnvironment _HostEnvironment,IRestuarantRepository _restuarantRepository)
        {
            this.repository = repository;
            HostEnvironment = _HostEnvironment;
            restuarantRepository = _restuarantRepository;
        }
        [HttpPost]
        [Route("AddDish")]
        public ActionResult<APIResponse<Dish>> AddDish([FromForm]DishCustomIn model)
        {
            Restuarant restuarant = restuarantRepository.GetRestuarantById(model.RestuarantId);
            string serverPath = null;
            if (model.Image != null)
            {
                bool check = System.IO.Directory.Exists(Path.Combine(HostEnvironment.WebRootPath, $"Restuarants/{restuarant.name}/Display"));
                if (!check)
                {
                    System.IO.Directory.CreateDirectory(Path.Combine(HostEnvironment.WebRootPath, $"Restuarants/{restuarant.name}/Display"));
                }
                string uniqueFileName = null;
                string filePath = null;
                string uploadsFolder = Path.Combine(HostEnvironment.WebRootPath, $"Restuarants/{restuarant.name}");
                uniqueFileName = $"{Guid.NewGuid().ToString()}_{model.Image.FileName}";
                filePath = Path.Combine(uploadsFolder, uniqueFileName);
                serverPath=Path.Combine($"Restuarants/{restuarant.name}", uniqueFileName);
                model.Image.CopyTo(new FileStream(filePath, FileMode.Create));
            }
            Dish dish = new Dish()
            {
                price = model.Price,
                description = model.Description,
                restuarantId = model.RestuarantId,


                name = model.Name,

                image = serverPath
            };

            
            
            Dish dishReturn = repository.AddDish(dish);
            dishReturn.imagesource = String.Format("{0}://{1}{2}/{3}", Request.Scheme, Request.Host, Request.PathBase, dishReturn.image);
            var response = new APIResponse<Dish>() 
            {
                Response=dishReturn
            };

            return Ok(response);
        }
        [HttpPost]
        [Route("RemoveDish")]
        public ActionResult<APIResponse<Dish>> RemoveDish(Dish dish)
        {
            Dish dishReturn = repository.RemoveDish(dish.id);
            dishReturn.imagesource = String.Format("{0}://{1}{2}/{3}", Request.Scheme, Request.Host, Request.PathBase, dishReturn.image);

            var response = new APIResponse<Dish>()
            {
                Response = dishReturn
            };
            return Ok(response);
        }
        [HttpGet]
        [Route("ListRestuDishes/{id}")]
        public ActionResult<List<Dish>> ListRestuDishes(int id)
        {
            List<Dish> ret = repository.GetDishesByResturantId(id);
            foreach(Dish D in ret)
            {
                D.imagesource = String.Format("{0}://{1}{2}/{3}", Request.Scheme, Request.Host, Request.PathBase, D.image);
            }
            return Ok(ret);
        }
        [HttpGet]
        [Route("GetDishbyID/{id}")]
        public ActionResult<Dish> GetDishbyID(int id)
        {
            Dish dish = repository.GetDishByDishId(id);
            dish.imagesource = String.Format("{0}://{1}{2}/{3}", Request.Scheme, Request.Host, Request.PathBase, dish.image);
            return Ok(dish);
        }
    }
}
