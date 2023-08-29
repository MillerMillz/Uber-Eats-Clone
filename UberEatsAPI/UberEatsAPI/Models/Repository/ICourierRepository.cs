namespace UberEatsAPI.Models.Repository
{
    public interface ICourierRepository
    {
        public DBCourier CreateNewCourier(DBCourier courier);
        public DBCourier UpdateCourier(DBCourier courier);
        public DBCourier DeleteCourier(DBCourier courier);
        public DBCourier GetCourierByID(string courierID);
        public DBCourier GetCourierByID(int id);
    }
}
