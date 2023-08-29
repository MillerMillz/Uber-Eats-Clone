using UberEatsAPI.Models.DataAccess;

namespace UberEatsAPI.Models.Repository
{
    public class UserRepository : IUserRepository
    {
        private readonly ApplicationDbContext dbContext;

        public UserRepository(ApplicationDbContext dbContext)
        {
            this.dbContext = dbContext;
        }
        public DBUser CreateNewUser(DBUser user)
        {
            dbContext.DBUsers.Add(user);
            dbContext.SaveChanges();
            return user;
        }

        public DBUser DeleteUser(DBUser user)
        {
            dbContext.DBUsers.Remove(user);
            dbContext.SaveChanges();
            return user;
        }

        public DBUser GetUserByID(string userID)
        {
            DBUser dBUser = new DBUser();
            foreach(DBUser user in dbContext.DBUsers)
            {
                if(user.UserID == userID)
                { dBUser = user;
                    break;
                }
            }
            return dBUser;
        }

        public DBUser GetUserByID(int id)
        {
            DBUser user = dbContext.DBUsers.Find(id);
            return user;
        }

        public DBUser UpdateUser(DBUser user)
        {
            dbContext.DBUsers.Update(user);
            dbContext.SaveChanges();
            return user;
        }
    }
}
