using UberEatsAPI.Models.DataAccess;

namespace UberEatsAPI.Models.Repository
{
    public class OrderRepository : IOrderRepository
    {
        private readonly ApplicationDbContext dbContext;

        public OrderRepository(ApplicationDbContext _dbContext)
        {
            dbContext = _dbContext;
        }
        public Order AddOrder(Order order)
        {
            dbContext.Orders.Add(order);
            dbContext.SaveChanges();
            return order;
        }

        public OrderDish AddOrderDish(OrderDish orderDish)
        {
            dbContext.OrderDishes.Add(orderDish);
            dbContext.SaveChanges();
            return orderDish;
        }

        public Order GetOrderByID(int orderID)
        {
            Order order =dbContext.Orders.Find(orderID) ;

            //foreach (Order od in new Order())
            //{
            //    if (od.Id == orderID)
            //        order = od;
            //}

            return order;
        }

        public List<OrderDish> GetOrderDishes(int orderID)
        {
            List<OrderDish> orderDishes = new List<OrderDish>();

            foreach (OrderDish od in dbContext.OrderDishes)
            {
                if (od.OrderID == orderID)
                    orderDishes.Add(od);
            }

            return orderDishes; ;
        }

        public List<Order> GetOrdersByStatus(string status)
        {
            List<Order> orders = new List<Order>();

            foreach (Order od in dbContext.Orders)
            {
                if (od.Status == status)
                    orders.Add(od);
            }

            return orders;
        }

        public List<Order> GetRestuOrders(int RestuID)
        {
            List<Order> orders = new List<Order>();

            foreach (Order od in dbContext.Orders)
            {
                if (od.RestaurantID == RestuID)
                    orders.Add(od);
            }

            return orders;
        }

        public List<Order> GetUserOrders(int UserId)
        {
            List<Order> orders = new List<Order>();

            foreach (Order od in dbContext.Orders)
            {
                if (od.UserID == UserId)
                    orders.Add(od);
            }

            return orders;
        }

        public Order UpdateOrder(Order order)
        {
            dbContext.Orders.Update(order);
            dbContext.SaveChanges();
            return order;
        }
    }
}
