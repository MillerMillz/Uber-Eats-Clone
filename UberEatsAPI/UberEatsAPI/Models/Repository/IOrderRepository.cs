using UberEatsAPI.Models.CustomModel;

namespace UberEatsAPI.Models.Repository
{
    public interface IOrderRepository
    {
        public List<Order> GetUserOrders(int UserId);
        public List<Order> GetRestuOrders(int RestuID);
        public Order AddOrder(Order order);
        public Order UpdateOrder(Order order);
        public OrderDish AddOrderDish(OrderDish orderDish);
        public Order GetOrderByID(int orderID);
        public List<OrderDish> GetOrderDishes(int orderID);
        public List<Order> GetOrdersByStatus(string status);
        
    }
}
