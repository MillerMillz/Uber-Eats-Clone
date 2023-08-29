namespace UberEatsAPI.Models.Repository
{
    public interface IUserRepository
    {
        public DBUser CreateNewUser(DBUser user);
        public DBUser UpdateUser(DBUser user);
        public DBUser DeleteUser(DBUser user);
        public DBUser GetUserByID(string userID);
        public DBUser GetUserByID(int id);
    }
}
