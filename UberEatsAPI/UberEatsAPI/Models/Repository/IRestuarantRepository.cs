namespace UberEatsAPI.Models.Repository
{
    public interface IRestuarantRepository
    {
        public List<Restuarant> GetAllRestuarants();
        public Restuarant GetRestuarantById(int id);
        public Restuarant AddRestuarant(Restuarant restuarant);
        public Restuarant UpdateRestuarant(Restuarant restuarant);
    }
}
