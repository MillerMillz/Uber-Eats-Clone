using System.ComponentModel.DataAnnotations;

namespace UberEatsAPI.Models
{
    public class Restuarant
    {
        [Key]
        public int id { get; set; }
        public string name { get; set; }
        public string image { get; set; }
        public double deliveryFee { get; set; }
        public int minDeliveryTime { get; set; }
        public int maxDeliveryTime { get; set; }
        public double rating { get; set; }
        public string address { get; set; }
        public double lat { get; set; }
        public double lng { get; set; }
        public string adminID { get; set; }

    }
}
