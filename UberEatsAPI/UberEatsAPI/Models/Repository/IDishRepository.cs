namespace UberEatsAPI.Models.Repository
{
    public interface IDishRepository
    {
        public List<Dish> GetAllDishes();
        public Dish GetDishByDishId(int id);
        public List<Dish> GetDishesByResturantId(int id);
        public Dish AddDish(Dish dish);
        public Dish UpdateDish(Dish dish);
        public Dish RemoveDish(int id);

    }
}
