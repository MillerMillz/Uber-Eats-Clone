using System.ComponentModel.DataAnnotations;

namespace UberEatsAPI.Models
{
    public class BasketDish
    {
        [Key]
        public int Id { get; set; }
        public int Quantity { get; set; }
        public int BasketID { get; set; }
        public int DishID { get; set; }

    }
}
