using System.ComponentModel.DataAnnotations;

namespace UberEatsAPI.Models.CustomModel
{
    public class BasketDishCustom
    {
        [Key]
        public int Id { get; set; }
        public int Quantity { get; set; }
        public int BasketID { get; set; }
        public Dish Dish { get; set; }
    }
}
