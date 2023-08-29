using UberEatsAPI.Models.DataAccess;

namespace UberEatsAPI.Models.Repository
{
    public class BasketRepository : IBasketRepository
    {
        private readonly ApplicationDbContext dbContext;

        public BasketRepository(ApplicationDbContext _dbContext)
        {
            dbContext = _dbContext;
        }
        public BasketDish AddDishToBasket(BasketDish dish)
        {
            dbContext.BasketDishes.Add(dish);
            dbContext.SaveChanges();
            return dish;
        }

        public Basket AddNewBasket(Basket basket)
        {
             dbContext.Baskets.Add(basket);
            dbContext.SaveChanges();
            return basket;
        }

        public Basket DeleteBasket(Basket basket)
        {
            dbContext.Baskets.Remove(basket);
            dbContext.SaveChanges();
            return basket; 
        }

        public Basket GetBasket(int id)
        {
            Basket ret = dbContext.Baskets.Find(id);
            return ret;
        }

        public Basket GetBasketByIds(int userID, int RestuID)
        {
            Basket basket = new Basket();
            foreach(Basket bas in dbContext.Baskets)
            {
                if((userID == bas.UserID)&&(RestuID==bas.RestaurantID))
                {
                    basket = bas;
                }
            }
            return basket;
        }

        public List<BasketDish> GetBasketDishes(int id)
        {
            List<BasketDish>  basketDishes = new List<BasketDish>();
            foreach (BasketDish bas in dbContext.BasketDishes)
            {
                if ((id == bas.BasketID))
                {
                    basketDishes.Add(bas);
                }
            }
            return basketDishes;
        }

        public List<Basket> GetUserBaskets(int userId)
        {
            List<Basket> userBaskkets = new List<Basket>();
            foreach (Basket bas in dbContext.Baskets)
            {
                if ((userId == bas.UserID))
                {
                    userBaskkets.Add(bas);
                }
            }
            return userBaskkets;
        }
    }
}
