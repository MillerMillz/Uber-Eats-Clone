using System.ComponentModel.DataAnnotations;

namespace UberEatsAPI.Models
{
    public class Basket
    {
        [Key]
        public int Id { get; set; }
        public int UserID { get; set; }
        public int RestaurantID { get; set; }

    }
}
