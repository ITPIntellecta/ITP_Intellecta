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
        public DbSet<CourseStatistics> Statistics { get; set; }


 protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        // Konfiguracija relacije između Course i User (Creator)
        modelBuilder.Entity<Course>()
            .HasOne(c => c.Creator)
            .WithMany(u => u.CreatedCourses)
            .HasForeignKey(c => c.CreatorId)
            .OnDelete(DeleteBehavior.Cascade); // Kaskadno brisanje kursa kada se korisnik obriše

        // Konfiguracija mnogostruko-mnogostruko relacije između Course i User
        modelBuilder.Entity<Course>()
            .HasMany(c => c.Users)
            .WithMany(u => u.Courses)
            .UsingEntity<Dictionary<string, object>>(
                "CourseUser",
                j => j.HasOne<User>().WithMany().HasForeignKey("UsersId").OnDelete(DeleteBehavior.Restrict), // Ograničeno brisanje
                j => j.HasOne<Course>().WithMany().HasForeignKey("CoursesCourseId").OnDelete(DeleteBehavior.Cascade)); // Kaskadno brisanje odnosa kada se kurs obriše

        modelBuilder.Entity<Review>()
            .HasOne(r => r.User)
            .WithMany(u => u.Reviews)
            .HasForeignKey(r => r.UserId)
            .OnDelete(DeleteBehavior.Restrict); // Ograničeno brisanje kako bi se izbegli ciklusi

        // Konfiguracija relacije između Review i Course
        modelBuilder.Entity<Review>()
            .HasOne(r => r.Course)
            .WithMany(c => c.Reviews)
            .HasForeignKey(r => r.CourseId)
            .OnDelete(DeleteBehavior.Cascade); // Kaskadno brisanje review-a kada se kurs obriše

    }
    }
}