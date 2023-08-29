using System.ComponentModel.DataAnnotations;

namespace UberEatsAPI.Models.CustomModel
{
    public class OrderDishCustom
    {
        [Key]
        public int Id { get; set; }
        public int Quantity { get; set; }
        public int OrderID { get; set; }
        public Dish Dish { get; set; }
    }
}
