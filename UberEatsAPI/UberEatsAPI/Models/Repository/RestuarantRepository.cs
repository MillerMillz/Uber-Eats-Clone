using UberEatsAPI.Models.DataAccess;

namespace UberEatsAPI.Models.Repository
{
    public class RestuarantRepository : IRestuarantRepository
    {
        private readonly ApplicationDbContext dbContext;

        public RestuarantRepository(ApplicationDbContext dbContext)
        {
            this.dbContext = dbContext;
        }

        public Restuarant AddRestuarant(Restuarant restuarant)
        {
            dbContext.Restuarants.Add(restuarant);
            dbContext.SaveChanges();
            return restuarant;

        }

        public List<Restuarant> GetAllRestuarants()
        {
            return dbContext.Restuarants.ToList();
        }

        public Restuarant GetRestuarantById(int id)
        {
            Restuarant restuarant = dbContext.Restuarants.Find(id);
            //foreach(Restuarant rest in dbContext.Restuarants)
            //{
            //    if(rest.id==id)
            //    {
            //        restuarant = rest;
            //        break;
            //    }
            //}
            return restuarant;
        }

        public Restuarant UpdateRestuarant(Restuarant restuarant)
        {
            dbContext.Restuarants.Update(restuarant);
            dbContext.SaveChanges();
            return restuarant;
        }
    }
}
