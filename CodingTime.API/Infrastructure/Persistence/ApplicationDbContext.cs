using Application.Entities;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Persistence;

public class ApplicationDbContext : DbContext
{
    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
    {
    }

    public DbSet<User> Users { get; set; }
    public DbSet<Language> Languages { get; set; }
    public DbSet<UserLanguage> UserLanguages { get; set; }
    public DbSet<Course> Courses { get; set; }
    public DbSet<Chapter> Chapters { get; set; }
    public DbSet<Lesson> Lessons { get; set; }
    public DbSet<Quiz> Quizzes { get; set; }
    public DbSet<QuizAnswer> QuizAnswers { get; set; }
    public DbSet<CompletedLesson> CompletedLessons { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<User>().HasKey(u => u.Id);
        modelBuilder.Entity<Language>().HasKey(l => l.Id);
        modelBuilder.Entity<Course>().HasKey(c => c.Id);
        modelBuilder.Entity<Chapter>().HasKey(ch => ch.Id);
        modelBuilder.Entity<Lesson>().HasKey(l => l.Id);
        modelBuilder.Entity<Quiz>().HasKey(q => q.Id);
        modelBuilder.Entity<QuizAnswer>().HasKey(qa => qa.Id);
        modelBuilder.Entity<CompletedLesson>().HasKey(cl => cl.Id);
        modelBuilder.Entity<UserLanguage>().HasKey(cl => cl.Id);

        modelBuilder.Entity<UserLanguage>()
            .HasOne(ul => ul.User)
            .WithMany(u => u.UserLanguages)
            .HasForeignKey(ul => ul.UserId);

        modelBuilder.Entity<UserLanguage>()
            .HasOne(ul => ul.Language)
            .WithMany(l => l.UserLanguages)
            .HasForeignKey(ul => ul.LanguageId);
        modelBuilder.Entity<Language>()
            .HasMany(c => c.Courses)
            .WithOne(l => l.Language)
            .HasForeignKey(l => l.LanguageId);

        modelBuilder.Entity<CompletedLesson>()
            .HasOne(cl => cl.User)
            .WithMany(u => u.CompletedLessons)
            .HasForeignKey(cl => cl.UserId);

        modelBuilder.Entity<CompletedLesson>()
            .HasOne(cl => cl.Lesson)
            .WithMany()
            .HasForeignKey(cl => cl.LessonId);

        modelBuilder.Entity<Course>()
            .HasMany(c => c.Chapters)
            .WithOne(ch => ch.Course)
            .HasForeignKey(ch => ch.CourseId);
        modelBuilder.Entity<Chapter>()
            .HasMany(ch => ch.Lessons)
            .WithOne(l => l.Chapter)
            .HasForeignKey(l => l.ChapterId);

        modelBuilder.Entity<QuizAnswer>()
            .HasOne(qa => qa.User)
            .WithMany(u => u.QuizAnswers)
            .HasForeignKey(qa => qa.UserId);

        modelBuilder.Entity<QuizAnswer>()
            .HasOne(qa => qa.Quiz)
            .WithMany(q => q.QuizAnswers)
            .HasForeignKey(qa => qa.QuizId);
        
        modelBuilder.Entity<Quiz>()
            .HasOne(q => q.Course)
            .WithMany(l => l.Quizzes)
            .HasForeignKey(q => q.CourseId);
    }
}