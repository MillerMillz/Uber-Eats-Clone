using System.ComponentModel.DataAnnotations;

namespace UberEatsAPI.Models
{
    public class Order
    {
        [Key]
        public int Id { get; set; }
        public int UserID { get; set; }
        public int CourierID { get; set; }
        public int RestaurantID { get; set; }
        public DateTime OrderTime { get; set; }
        public int NoItems { get; set; }
        public string Status { get; set; }
        public double Total { get; set; }   

    }
}
