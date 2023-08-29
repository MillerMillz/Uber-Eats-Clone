using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using UberEatsAPI.Models;
using UberEatsAPI.Models.CustomModel;
using UberEatsAPI.Models.Repository;

namespace UberEatsAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BasketController : ControllerBase
    {
        private readonly IBasketRepository repository;
        private readonly IDishRepository dishRepository;
        private readonly IRestuarantRepository restRepo;

        public BasketController(IBasketRepository _repository,IDishRepository dishRepository,IRestuarantRepository _restRepo)
        {
            repository = _repository;
            this.dishRepository = dishRepository;
            restRepo = _restRepo;
        }


        [HttpGet]
        [Route("GetBasket/{id}")]
        public ActionResult<Basket> GetBasket(int id)
        {
            Basket ret = repository.GetBasket(id);
            
            return Ok(ret);
        }

        [HttpGet]
        [Route("GetBasketByIds/{id1}/{id2}")]
        public ActionResult<Basket> GetBasketByIds(int id1, int id2)
        {
            Basket ret = repository.GetBasketByIds(id1, id2);
            if (ret.Id == 0)
                ret = new Basket() { Id = -1};
            return Ok(ret);
        }
        [HttpGet]
        [Route("GetUserBaskets/{id}")]
        public ActionResult<Basket> GetUserBaskets(int id)
        {
            List<Basket> baskets = repository.GetUserBaskets(id);
            List<BasketCustom> ret = new List<BasketCustom>();
            List<BasketDish> dishes;
            BasketCustom adder;
            
            
            foreach (Basket bas in baskets)
            {
                double total = 0;
                dishes=repository.GetBasketDishes(bas.Id);
                foreach(BasketDish dish in dishes)
                {
                    total += (dishRepository.GetDishByDishId(dish.DishID).price*dish.Quantity);
                }
              Restuarant res = restRepo.GetRestuarantById(bas.RestaurantID);

                adder = new BasketCustom()
                {
                    Id = bas.Id,
                    Restuarant =  new RestuarantCustom
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
                    },
                    NoItems=dishes.Count,
                    Total=total
                };
                ret.Add(adder);
            }
            return Ok(ret);
        }
        [HttpGet]
        [Route("GetBasketDishes/{id}")]
        public ActionResult<List<BasketDishCustom>> GetBasketDishes(int id)
        {
            List<BasketDishCustom> bdishes = new List<BasketDishCustom>();
            BasketDishCustom adder;
            List<BasketDish> ret = repository.GetBasketDishes(id);
            foreach(var a in ret)
            {
                adder = new BasketDishCustom()
                {
                    Id = a.Id,
                    Quantity = a.Quantity,
                    Dish = dishRepository.GetDishByDishId(a.DishID),
                    BasketID = a.BasketID
                };
                bdishes.Add(adder); 
            }
            return Ok(bdishes);
        }
        [HttpPost]
        [Route("AddDishToBasket")]
        public ActionResult<BasketDishCustom> AddDishToBasket(BasketDishCustom basketDishC)
        {
            BasketDish basketDish = new BasketDish()
            {
                Id = basketDishC.Id,
                Quantity = basketDishC.Quantity,
                BasketID = basketDishC.BasketID,
                DishID = basketDishC.Dish.id
            };
            BasketDish basketDishret = repository.AddDishToBasket(basketDish);
            Dish dish = dishRepository.GetDishByDishId(basketDishret.DishID);
            BasketDishCustom ret = new BasketDishCustom()
            {
                Id = basketDishret.Id,
                Quantity = basketDishret.Quantity,
                BasketID = basketDishret.BasketID,
                Dish = dish
            };
            return Ok(ret);
        }
        [HttpPost]
        [Route("DeleteBasket")]
        public ActionResult<Basket> DeleteBasket(Basket basket)
        {
            Basket basketret = repository.DeleteBasket(basket);
            return Ok(basketret);
        }
        [HttpPost]
        [Route("AddBasket")]
        public ActionResult<Basket> AddBasket(Basket basket)
        {
            Basket baskeRet = repository.AddNewBasket(basket);
            return Ok(baskeRet);
        }

    }
}
