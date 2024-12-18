using Microsoft.EntityFrameworkCore;
using TechnicoBackend.Models;

namespace TechnicoBackend.Data
{
    public class TechnicoDbContext : DbContext
    {
        public TechnicoDbContext(DbContextOptions<TechnicoDbContext> options) : base(options) { }

        public DbSet<User> Users { get; set; } = null!;
        public DbSet<Property> Properties { get; set; } = null!;
        public DbSet<Repair> Repairs { get; set; } = null!;

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Property>()
                .HasOne(p => p.User)
                .WithMany(u => u.Properties)
                .HasForeignKey(p => p.UserId)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<Repair>()
                .HasOne(r => r.Property)
                .WithMany(p => p.Repairs)
                .HasForeignKey(r => r.PropertyId)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<Repair>()
                .Property(r => r.Status)
                .HasDefaultValue("Pending");

            modelBuilder.Entity<Repair>()
                .Property(r => r.Type)
                .IsRequired();

            modelBuilder.Entity<Repair>()
                .Property(r => r.Cost)
                .IsRequired()
                .HasColumnType("decimal(18,2)"); 

            modelBuilder.Entity<Repair>()
                .Property(r => r.RepairAddress)
                .IsRequired(false);

            modelBuilder.Entity<User>()
                .HasIndex(u => u.Email)
                .IsUnique();

            modelBuilder.Entity<User>()
                .HasIndex(u => u.PhoneNumber)
                .IsUnique();

            modelBuilder.Entity<Property>()
                .HasIndex(p => new { p.UserId, p.Address })
                .IsUnique();

            modelBuilder.Entity<Repair>()
                .HasIndex(r => new { r.PropertyId, r.RepairDate })
                .IsUnique();
        }
    }
}