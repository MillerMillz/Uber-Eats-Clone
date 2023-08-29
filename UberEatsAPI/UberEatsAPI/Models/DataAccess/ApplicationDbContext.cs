using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace UberEatsAPI.Models.DataAccess
{
    public class ApplicationDbContext:IdentityDbContext<ApplicationUser,IdentityRole,string>
    {
        public ApplicationDbContext(DbContextOptions options):base(options)
        {

        }
        public DbSet<Restuarant>? Restuarants { get; set; }
        public DbSet<Dish>? Dishes { get; set; }
        public DbSet<Basket>? Baskets { get; set; }
        public DbSet<BasketDish>? BasketDishes { get; set; }
        public DbSet<DBUser>? DBUsers { get; set; }
        public DbSet<DBCourier>? DBCouriers { get; set; }
        public DbSet<Order>? Orders { get; set; }
        public DbSet<OrderDish>? OrderDishes { get; set; }
        public DbSet<OrderStatus>? OrderStatuses { get; set; }


    }
}
