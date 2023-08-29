using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using UberEatsAPI.Models;
using UberEatsAPI.Models.CustomModel;
using UberEatsAPI.Models.Repository;

namespace UberEatsAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrderController : ControllerBase
    {
        private readonly IOrderRepository repository;
        private readonly IRestuarantRepository repo;
        private readonly IDishRepository dishRepo;
        private readonly IUserRepository userRepo;

        public OrderController(IOrderRepository repository,IRestuarantRepository repo,IDishRepository dishRepo,IUserRepository UserRepo)
        {
            this.repository = repository;
            this.repo = repo;
            this.dishRepo = dishRepo;
            userRepo = UserRepo;
        }
        [HttpGet]
        [Route("GetUserOrders/{id}")]
        public ActionResult<List<OrderCustom>> GetUserOrders(int id)
        {
            OrderCustom orderCustom;
            Restuarant res;
            List<OrderCustom> ret = new List<OrderCustom>();
            List<Order> orders = repository.GetUserOrders(id);
            foreach (Order order in orders)
            {
                res = repo.GetRestuarantById(order.RestaurantID);
                    orderCustom = new OrderCustom()
                {
                    Id = order.Id,
                    Status = order.Status,
                    OrderTime = calcTimeDif(order.OrderTime),
                    Total = order.Total,
                    UserID = order.UserID,
                    NoItems = order.NoItems,
                    Restuarant = new RestuarantCustom
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
                };
                ret.Add(orderCustom);
            }
            return Ok(ret);

        }
        private int calcTimeDif(DateTime orderDate)
        {
            int years = DateTime.Now.Year - orderDate.Year;
            int months = DateTime.Now.Month - orderDate.Month;
            int days = DateTime.Now.Day - orderDate.Day;
            int hours = DateTime.Now.Hour - orderDate.Hour;
            int minutes = DateTime.Now.Minute - orderDate.Minute;

            int ret = (years * 365 * 24 * 60) + (months * 30 * 24 * 60) + (days * 24 * 60) + (hours * 60) + minutes;


            return ret; 
        }
        [HttpPost]
        [Route("AddOrder")]
        public ActionResult<OrderCustom> AddOrder(Order order)
        {
            //Order order = new Order()
            //{
            //    Id = orderC.Id,
            //    Status = orderC.Status,
            //    Total = orderC.Total,
            //    UserID = orderC.UserID,
            //    RestuarantID = orderC.RestuarantID
            //};
            order.OrderTime = DateTime.Now;
            Order retOrder = repository.AddOrder(order);
            Restuarant res = repo.GetRestuarantById(retOrder.RestaurantID);
            RestuarantCustom restuarant = new RestuarantCustom
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
            OrderCustom orderCustom = new OrderCustom()
            {

                Id = retOrder.Id,
                Status = retOrder.Status,
                Total = retOrder.Total,
                UserID = retOrder.UserID,
                Restuarant = restuarant
            };
            return Ok(orderCustom);
        }
        [HttpPost]
        [Route("UpdateOrder")]
        public ActionResult<CustomerOrderDishes> UpdateOrder(CustomerOrderDishes orderC)
        {
            Order order = repository.GetOrderByID(orderC.Id);
            order.Status = orderC.Status;
            Order retOrder = repository.UpdateOrder(order);
            List<OrderDish> dishes = repository.GetOrderDishes(orderC.Id);
            CustomerOrderDishes orderDishes = new CustomerOrderDishes();
            orderDishes.Id = order.Id;
            orderDishes.Total = order.Total;
            orderDishes.Status = order.Status;
            orderDishes.User = orderC.User;
            orderDishes.Dishes = orderC.Dishes;
            //BasketDishCustom adder;
            //foreach (OrderDish OD in dishes)
            //{
            //    adder = new BasketDishCustom()
            //    {
            //        Id = OD.Id,
            //        Quantity = OD.Quantity,
            //        Dish = dishRepo.GetDishByDishId(OD.DishID),
            //    };
            //    orderDishes.Dishes.Add(adder);
            //}
            return Ok(orderDishes);
        }
        [HttpPost]
        [Route("UpdateOrderStatus")]
        public ActionResult<OrderCustom> UpdateOrderStatus(Order order)
        {
            Order sub = repository.GetOrderByID(order.Id);
            sub.CourierID = order.CourierID;
            sub.Status = order.Status;
            Order submited = repository.UpdateOrder(sub);
            Restuarant res = repo.GetRestuarantById(sub.RestaurantID);
            RestuarantCustom restuarant = new RestuarantCustom
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
            OrderCustom retOrder = new OrderCustom()
            {
                Id = sub.Id,
                Status = sub.Status,
                UserID = sub.UserID,
                NoItems = sub.NoItems,
                CourierID=sub.CourierID,
                Total = sub.Total,
                Restuarant = restuarant
            };
            return Ok(retOrder);
        }
        [HttpPost]
        [Route("AddOrderDish")]
        public ActionResult<OrderDishCustom> AddOrderDish(OrderDishCustom orderDishC)
        {
            OrderDish orderDish = new OrderDish()
            {
                OrderID = orderDishC.OrderID,
                Id = orderDishC.Id,
                Quantity = orderDishC.Quantity,
                DishID = orderDishC.Dish.id
            };
            OrderDish ret1 = repository.AddOrderDish(orderDish);
            OrderDishCustom ret2 = new OrderDishCustom()
            {
                OrderID = ret1.OrderID,
                Id = ret1.OrderID,
                Quantity = ret1.Quantity,
                Dish = dishRepo.GetDishByDishId(ret1.DishID)
            };
            return Ok(ret2);
        }
        [HttpGet]
        [Route("GetOrderByID/{id}")]
        public ActionResult<OrderCustom> GetOrderByID(int id)
        {

            Order order = repository.GetOrderByID(id);
            Restuarant res = repo.GetRestuarantById(order.RestaurantID);
            RestuarantCustom restuarant = new RestuarantCustom
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
            OrderCustom orderCustom = new OrderCustom()
            {
             
                CourierID=order.CourierID,
                Id = order.Id,
                Status = order.Status,
                Total = order.Total,
                UserID = order.UserID,
                Restuarant = restuarant
            };
            return Ok(orderCustom);
        }
        [HttpGet]
        [Route("GetCustomerOrderDishes/{id}")]
        public ActionResult<CustomerOrderDishes> GetCustomerOrderDishes(int id)
        {
            Order order = repository.GetOrderByID(id);
            List<OrderDish> dishes = repository.GetOrderDishes(id);
            CustomerOrderDishes orderDishes = new CustomerOrderDishes();
            orderDishes.Id = order.Id;
            orderDishes.Total = order.Total;
            orderDishes.Status = order.Status;
            orderDishes.User = userRepo.GetUserByID(order.UserID);
            orderDishes.Dishes = new List<BasketDishCustom>();
            BasketDishCustom adder;
            foreach(OrderDish OD in dishes)
            {
                adder = new BasketDishCustom()
                {
                    Id = OD.Id,
                    Quantity = OD.Quantity,
                    Dish = dishRepo.GetDishByDishId(OD.DishID),
                };
                orderDishes.Dishes.Add(adder);
            }
            return Ok(orderDishes);
        }
            [HttpGet]
        [Route("GetRestaurantOrders/{id}")]
        public ActionResult<List<DeliveryOrderCustom>> GetRestaurantOrders(int id)
        {
            List<Order> orders = repository.GetRestuOrders(id);
            List<DeliveryOrderCustom> ordersRet = new List<DeliveryOrderCustom>();
            DeliveryOrderCustom adder ;
          
            foreach (Order Or in orders)
            {
                if(Or.Status=="NEW" || Or.Status=="COOKING" || Or.Status=="READY_FOR_PICKUP")
                {
                    adder = new DeliveryOrderCustom();
                    adder.deliveryAddress = userRepo.GetUserByID(Or.UserID).Address;
                    adder.Id = Or.Id;
                    adder.RestuarantName =repo.GetRestuarantById(Or.RestaurantID).name ;
                    adder.Status = Or.Status;
                    adder.Total = Or.Total;

                    ordersRet.Add(adder);
                }
            }

            return Ok(ordersRet);
        }
        [HttpGet]
        [Route("OrderHistory/{id}")]
        public ActionResult<List<DeliveryOrderCustom>> OrderHistory(int id)
        {
            List<Order> orders = repository.GetRestuOrders(id);
            List<DeliveryOrderCustom> ordersRet = new List<DeliveryOrderCustom>();
            DeliveryOrderCustom adder;

            foreach (Order Or in orders)
            {
                if (Or.Status == "DELIVERED" || Or.Status == "DECLINED_BY_RESTAURANT" )
                {
                    adder = new DeliveryOrderCustom();
                    adder.deliveryAddress = userRepo.GetUserByID(Or.UserID).Address;
                    adder.Id = Or.Id;
                    adder.RestuarantName = repo.GetRestuarantById(Or.RestaurantID).name;
                    adder.Status = Or.Status;
                    adder.Total = Or.Total;

                    ordersRet.Add(adder);
                }
            }

            return Ok(ordersRet);
        }
        [HttpGet]
        [Route("GetOrderDishes/{id}")]
        public ActionResult<List<OrderDishCustom>> GetOrderDishes(int id)
        {
            List<OrderDish> orderDishes = repository.GetOrderDishes(id);
            List<OrderDishCustom> ODCs = new List<OrderDishCustom>();
            OrderDishCustom ODC;
            foreach(OrderDish d in orderDishes)
            {
                ODC = new OrderDishCustom()
                {
                    Id = d.Id,
                    OrderID = d.OrderID,
                    Quantity = d.Quantity,
                    Dish = dishRepo.GetDishByDishId(d.DishID)
                };
                ODCs.Add(ODC);
            }
            return Ok(ODCs);
        }
        [HttpGet]
        [Route("GetOrderByStatus/{id}")]
        public ActionResult<List<OrderCustom>> GetOrderByStatus(string id)
        {
            List<Order> orders = repository.GetOrdersByStatus(id);
            List<OrderCustom> ordersRet = new List<OrderCustom>();
           
          
            OrderCustom adder;
            foreach(Order o in orders)
            { 
                Restuarant res = repo.GetRestuarantById(o.RestaurantID);
                adder = new OrderCustom()
                {
                    Id = o.Id,
                    Restuarant =new RestuarantCustom {  
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
                rating = res.rating},
                    Status = o.Status,
                    Total = o.Total,
                    UserID = o.UserID
                };
                ordersRet.Add(adder);
            }

            return Ok(ordersRet);
        }
    }
}
