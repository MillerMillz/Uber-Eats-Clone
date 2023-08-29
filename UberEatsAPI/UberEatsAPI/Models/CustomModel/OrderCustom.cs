using System.ComponentModel.DataAnnotations;

namespace UberEatsAPI.Models.CustomModel
{
    public class OrderCustom
    {
        [Key]
        public int Id { get; set; }
        public int UserID { get; set; }
        public RestuarantCustom Restuarant { get; set; }
        public int OrderTime { get; set; }
        public int NoItems { get; set; }
        public string Status { get; set; }
        public double Total { get; set; }
        public int CourierID { get; set; }
    }
}
