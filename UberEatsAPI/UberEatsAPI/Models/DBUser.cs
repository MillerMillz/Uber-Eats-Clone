using System.ComponentModel.DataAnnotations;

namespace UberEatsAPI.Models
{
    public class DBUser
    {
        [Key]
        public int Id { get; set; }
        public string UserID { get; set; }
        public string Name { get; set; }
        public string Address { get; set; }
        public double Lat { get; set; }
        public double Lng { get; set; }

    }
}
