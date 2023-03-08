using API.Models;
using Microsoft.EntityFrameworkCore;

namespace API.Data;

public class ApplicationDbContext :DbContext
{
    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
    {
        
    }

    public DbSet<User> Users { get; set; }
    public DbSet<Langage> Langages { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<User>().HasKey(u => u.Id);
        modelBuilder.Entity<Langage>().HasKey(l => l.Id);
        modelBuilder.Entity<UserLangage>()
            .HasKey(ul => new { ul.UserId, ul.LangageId });

        modelBuilder.Entity<UserLangage>()
            .HasOne(ul => ul.User)
            .WithMany(u => u.UserLangages)
            .HasForeignKey(ul => ul.UserId);

        modelBuilder.Entity<UserLangage>()
            .HasOne(ul => ul.Langage)
            .WithMany(l => l.UserLangages)
            .HasForeignKey(ul => ul.LangageId);
    }
    
}