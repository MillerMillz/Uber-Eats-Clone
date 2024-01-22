using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Hosting.Internal;
using System.Drawing;
using UberEatsAPI.Models;
using UberEatsAPI.Models.CustomModel;
using UberEatsAPI.Models.DataAccess;
using UberEatsAPI.Models.Repository;

namespace UberEatsAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RestuarantController : ControllerBase
    {
        private readonly IRestuarantRepository repository;
        public IWebHostEnvironment HostEnvironment { get; }

        public RestuarantController(IRestuarantRepository repository,IWebHostEnvironment _HostEnvironment)
        {
            this.repository = repository;
            HostEnvironment = _HostEnvironment;
        }

        [HttpPost]
        [Route("AddRestuarant")]
        public ActionResult<RestuarantCustom> AddRestuarant([FromForm]RestuarantCustomIn model)
        {
            bool check = System.IO.Directory.Exists(Path.Combine(HostEnvironment.WebRootPath, $"Restuarants/{model.name}/Display"));
            if(!check)
            {
                System.IO.Directory.CreateDirectory(Path.Combine(HostEnvironment.WebRootPath, $"Restuarants/{model.name}/Display"));
            }
            string serverPath = null;
            string uniqueFileName = null;
            string filePath = null;
            if (model.image != null)
            {
                string uploadsFolder = Path.Combine(HostEnvironment.WebRootPath, $"Restuarants/{model.name}/Display");
                uniqueFileName = $"{Guid.NewGuid().ToString()}_{model.image.FileName}";
                 filePath = Path.Combine(uploadsFolder, uniqueFileName);
                serverPath= Path.Combine($"Restuarants/{model.name}/Display", uniqueFileName);
                model.image.CopyTo(new FileStream(filePath, FileMode.Create));
            }
            Restuarant restuarant = new Restuarant()
            {
                address = model.address,
                adminID = model.adminID,
                deliveryFee = model.deliveryFee,
                lat = model.lat,
                lng = model.lng,
                maxDeliveryTime = model.maxDeliveryTime,
                minDeliveryTime = model.minDeliveryTime,
                name = model.name,
                rating = 0,
                image = serverPath
            };
            repository.AddRestuarant(restuarant);
        
            return Ok("Success");

        }
        [HttpPost]
        [Route("EditRestuarant")]
        public ActionResult<APIResponse<RestuarantCustom>> EditRestuarant([FromForm] RestuarantCustomIn model)
        {
            Restuarant edit = repository.GetRestuarantById(model.id); 
            string serverPath = null;
            if (model.image != null)
                {
                    bool check = System.IO.Directory.Exists(Path.Combine(HostEnvironment.WebRootPath, $"Restuarants/{model.name}/Display"));
                    if (!check)
                    {
                        System.IO.Directory.CreateDirectory(Path.Combine(HostEnvironment.WebRootPath, $"Restuarants/{model.name}/Display"));
                    }
                   
                    string uniqueFileName = null;
                    string filePath = null;
                    string uploadsFolder = Path.Combine(HostEnvironment.WebRootPath, $"Restuarants/{model.name}/Display");
                    uniqueFileName = $"{Guid.NewGuid().ToString()}_{model.image.FileName}";
                    filePath = Path.Combine(uploadsFolder, uniqueFileName);
                     serverPath = Path.Combine($"Restuarants/{model.name}/Display", uniqueFileName);
                     model.image.CopyTo(new FileStream(filePath, FileMode.Create));
                        
            }

            edit.address = model.address;
            edit.adminID = model.adminID;
            edit.deliveryFee = model.deliveryFee;
            edit.lat = model.lat;
            edit.lng = model.lng;
            edit.maxDeliveryTime = model.maxDeliveryTime;
            edit.minDeliveryTime = model.minDeliveryTime;
            edit.name = model.name;
            edit.rating = model.rating;
            edit.image = serverPath == null ? edit.image : serverPath;
            
            Restuarant ret = repository.UpdateRestuarant(edit);
            var response = new APIResponse<RestuarantCustom>();
            response.Response = new RestuarantCustom()
            {
                name = ret.name,
                address = ret.address,
                adminID = ret.adminID,
                deliveryFee = ret.deliveryFee,
                id = ret.id,
                lat = ret.lat,
                lng = ret.lng,
                maxDeliveryTime = ret.maxDeliveryTime,
                minDeliveryTime = ret.minDeliveryTime,
                rating = ret.rating,
                image = ret.image,
                imageSource = String.Format("{0}://{1}{2}/{3}", Request.Scheme, Request.Host, Request.PathBase, ret.image),
            };
            return response;

        }

        [HttpGet]
        [Route("ListRestuarants")]
        public ActionResult<List<RestuarantCustom>> ListRestuarants()
        {
            List<Restuarant> ret = repository.GetAllRestuarants();
            List<RestuarantCustom> theList = new List<RestuarantCustom>();
            RestuarantCustom adder;
            foreach(Restuarant res in ret)
            {
                adder = new RestuarantCustom()
                {
                    id=res.id,
                    name=res.name,
                    image=res.image,
                    imageSource=String.Format("{0}://{1}{2}/{3}",Request.Scheme,Request.Host,Request.PathBase,res.image),
                    maxDeliveryTime=res.maxDeliveryTime,
                    minDeliveryTime=res.minDeliveryTime,
                    address=res.address,
                    adminID= res.adminID,
                    deliveryFee=res.deliveryFee,
                    lng=res.lng,
                    lat=res.lat,
                    rating=res.rating
                };
                theList.Add(adder);
            }
            return theList ;
        }
        [HttpGet]
        [Route("GetRestuarant/{id}")]
        public ActionResult<RestuarantCustom> GetRestuarant(int id)
        {
            Restuarant res = repository.GetRestuarantById(id);
            RestuarantCustom ret = new RestuarantCustom()
            {
                id = res.id,
                name = res.name,
                image = res.image,
                imageSource = String.Format("{0}://{1}{2}/{3}", Request.Scheme, Request.Host, Request.PathBase, res.image),
                maxDeliveryTime = res.maxDeliveryTime,
                minDeliveryTime = res.minDeliveryTime,
                address = res.address,
                adminID = res.adminID,
                deliveryFee = res.deliveryFee,
                lng = res.lng,
                lat = res.lat,
                rating = res.rating
            };
            return ret;
        }
        [HttpGet]
        [Route("GetRestuarantByAdminID/{id}")]
        public ActionResult<RestuarantCustom> GetRestuarantByAdminID(string id)
        {
            List<Restuarant> restuarants = repository.GetAllRestuarants().Where(z => z.adminID == id).ToList();

            foreach(Restuarant res in restuarants)
            {
                if(res.adminID==id)
                {
                    RestuarantCustom ret = new RestuarantCustom()
                    {
                        id = res.id,
                        name = res.name,
                        image = res.image,
                        imageSource = String.Format("{0}://{1}{2}/{3}", Request.Scheme, Request.Host, Request.PathBase, res.image),
                        maxDeliveryTime = res.maxDeliveryTime,
                        minDeliveryTime = res.minDeliveryTime,
                        address = res.address,
                        adminID = res.adminID,
                        deliveryFee = res.deliveryFee,
                        lng = res.lng,
                        lat = res.lat,
                        rating = res.rating
                    };

                    return ret;
                }
            }
            
            return  null;
        }
    }
}
