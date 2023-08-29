namespace UberEatsAPI.Models
{
    public class DBCourier
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string UserID { get; set; }
        public double lat { get; set; }
        public double lng { get; set; }
        public string TransportationMode { get; set; }
    }
}
