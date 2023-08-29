using UberEatsAPI.Models.DataAccess;

namespace UberEatsAPI.Models.Repository
{
    public class DishRepository : IDishRepository
    {
        private readonly ApplicationDbContext dbContext;

        public DishRepository(ApplicationDbContext dbContext)
        {
            this.dbContext = dbContext;
        }

        public Dish AddDish(Dish dish)
        {
            dbContext.Dishes.Add(dish);
            dbContext.SaveChanges();

            return dish;
        }

        public List<Dish> GetAllDishes()
        {
            return dbContext.Dishes.ToList();
        }

        public Dish GetDishByDishId(int id)
        {
            Dish dish = null;
            foreach (Dish ob in dbContext.Dishes)
            {
                if (ob.id == id)
                {
                    dish = ob;
                    break;
                }
            }
            return dish;
        }
        public List<Dish> GetDishesByResturantId(int id)
        {
            List<Dish> dishes = new List<Dish>();
            List<Dish> dishesCout = dbContext.Dishes.ToList();
            
            foreach (Dish ob in dishesCout)
            {
                if (ob.restuarantId == id)
                {
                    dishes.Add(ob);
                }
            }
            return dishes;
        }

        public Dish RemoveDish(int id)
        {
            Dish remove = dbContext.Dishes.Find(id);
            dbContext.Dishes.Remove(remove);
            dbContext.SaveChanges();
            return remove;
        }

        public Dish UpdateDish(Dish dish)
        {
            dbContext.Dishes.Update(dish);
            dbContext.SaveChanges();

            return dish;
        }

        
    }
}
