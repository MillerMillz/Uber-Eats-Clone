using System.ComponentModel.DataAnnotations;

namespace UberEatsAPI.Models.CustomModel
{
    public class BasketCustom
    {
        [Key]
        public int Id { get; set; }
        public RestuarantCustom Restuarant { get; set; }
        public int NoItems { get; set; }
        public double Total { get; set; }
    }
}
