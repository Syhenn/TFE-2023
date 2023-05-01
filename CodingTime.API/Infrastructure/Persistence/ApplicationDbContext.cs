using Application.Entities;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Persistence;

public class ApplicationDbContext : DbContext
{
    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
    {
    }

    public DbSet<User> Users { get; set; }
    public DbSet<Language> Langages { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<User>().HasKey(u => u.Id);
        modelBuilder.Entity<Language>().HasKey(l => l.Id);
        modelBuilder.Entity<UserLanguage>()
            .HasKey(ul => new { ul.UserId, ul.LangageId });

        modelBuilder.Entity<UserLanguage>()
            .HasOne(ul => ul.User)
            .WithMany(u => u.UserLanguages)
            .HasForeignKey(ul => ul.UserId);
        
        modelBuilder.Entity<UserLanguage>()
            .HasOne(ul => ul.Langage)
            .WithMany(l => l.UserLanguages)
            .HasForeignKey(ul => ul.LangageId);
    }
}