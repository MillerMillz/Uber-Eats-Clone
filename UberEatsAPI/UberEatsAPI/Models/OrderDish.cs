using System.ComponentModel.DataAnnotations;

namespace UberEatsAPI.Models
{
    public class OrderDish
    {
        [Key]
        public int Id { get; set; }
        public int Quantity { get; set; }
        public int OrderID { get; set; }
        public int DishID { get; set; }
    }
}
