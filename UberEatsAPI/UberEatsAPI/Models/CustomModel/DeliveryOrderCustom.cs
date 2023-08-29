using System.ComponentModel.DataAnnotations;

namespace UberEatsAPI.Models.CustomModel
{
    public class DeliveryOrderCustom
    {
        [Key]
        public int Id { get; set; }
        public string deliveryAddress { get; set; }
        public string RestuarantName { get; set; }
        public string Status { get; set; }
        public double Total { get; set; }
    }
}
