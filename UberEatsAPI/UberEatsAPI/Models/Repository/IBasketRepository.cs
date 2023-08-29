namespace UberEatsAPI.Models.Repository
{
    public interface IBasketRepository
    {
        public List<Basket> GetUserBaskets(int userId);
        public Basket GetBasketByIds(int userID,int RestuID);
        public Basket GetBasket(int id);
        public Basket AddNewBasket(Basket basket);
        public List<BasketDish> GetBasketDishes(int id);
        public BasketDish AddDishToBasket(BasketDish dish);
        public Basket DeleteBasket(Basket basket);
    }
}
