using System.ComponentModel.DataAnnotations;

namespace UberEatsAPI.Models.CustomModel
{
    public class CustomerOrderDishes
    {
        [Key]
        public int Id { get; set; }
        public DBUser User { get; set; }
        public List<BasketDishCustom> Dishes { get; set; }
        public string Status { get; set; }
        public double Total { get; set; }
    }
}
