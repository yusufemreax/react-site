using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;

namespace ECommerceAPI.Models
{
    public class DatabaseContext : DbContext
    {
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<USERS>().HasKey(u => u.USERNAME);
        }
        public DatabaseContext (DbContextOptions<DatabaseContext> options) : base (options)
        {
            
        }
        
        public DbSet<USERS> Users { get; set; }
    }
}
