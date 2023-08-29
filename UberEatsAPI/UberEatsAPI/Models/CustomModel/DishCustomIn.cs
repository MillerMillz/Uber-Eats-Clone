using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace UberEatsAPI.Models.CustomModel
{
    public class DishCustomIn
    {
        [Key]
        public int Id { get; set; }
        public string Name { get; set; }
        [NotMapped]
        public IFormFile Image { get; set; }
      

        public string Description { get; set; }
        public double Price { get; set; }
        public int RestuarantId { get; set; }

    }
}
