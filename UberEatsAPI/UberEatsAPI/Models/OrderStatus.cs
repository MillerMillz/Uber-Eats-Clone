using System.ComponentModel.DataAnnotations;

namespace UberEatsAPI.Models
{
    public class OrderStatus
    {
        [Key]
        public int Id { get; set; }
        public string Status { get; set; }
    }
}
