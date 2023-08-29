using UberEatsAPI.Models.DataAccess;

namespace UberEatsAPI.Models.Repository
{
    public class CourierRepository : ICourierRepository
    {
        private readonly ApplicationDbContext dbContext;

        public CourierRepository(ApplicationDbContext dbContext)
        {
            this.dbContext = dbContext;
        }
        public DBCourier CreateNewCourier(DBCourier courier)
        {
            dbContext.DBCouriers.Add(courier);
            dbContext.SaveChanges();
            return courier;
        }

        public DBCourier DeleteCourier(DBCourier courier)
        {
            dbContext.DBCouriers.Remove(courier);
            dbContext.SaveChanges();
            return courier;
        }

        public DBCourier GetCourierByID(string courierID)
        {
            DBCourier ret = null;
            foreach(DBCourier c in dbContext.DBCouriers)
            {
                if (c.UserID==courierID)
                {
                    ret = c;
                    break;
                }
            }
            return ret;
                
        }

        public DBCourier GetCourierByID(int id)
        {
            DBCourier ret = dbContext.DBCouriers.Find(id);
            return ret;
        }

        public DBCourier UpdateCourier(DBCourier courier)
        {
            dbContext.DBCouriers.Update(courier);
            dbContext.SaveChanges();
            return courier;
        }
    }
}
