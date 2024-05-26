using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ITP_Intellecta.Models;

namespace ITP_Intellecta.Data
{
    public class DataContext:DbContext
    {
        public DataContext(DbContextOptions<DataContext> options):base(options)
        {
            
        }
        // ime DbSet ce biti ime tabele u bazi
        public DbSet<User> Users { get; set; }
        public DbSet<Course> Courses { get; set; }
        public DbSet<CourseContent> Materials { get; set; }
        public DbSet<Review> Reviews { get; set; }

    }
}