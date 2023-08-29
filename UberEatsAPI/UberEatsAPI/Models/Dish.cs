using System.ComponentModel.DataAnnotations;

namespace UberEatsAPI.Models
{
    public class Dish
    {
        [Key]
        public int id { get; set; }
        public string name { get; set; }
        public string image { get; set; }
        public string? imagesource { get; set; }

        public string description { get; set; }
        public double price { get; set; }
        public int restuarantId { get; set; }

    }
}
