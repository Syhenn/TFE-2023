using System.Text.Json.Serialization;
using Domain.Enum;

namespace Application.Entities;

public class User
{
    public int Id { get; set; }
    public string Name { get; set; }
    public string Surname { get; set; }
    public string DisplayName { get; set; }
    public string Email { get; set; }
    public string Password { get; set; }
    public int Age { get; set; }
    public UserRole? UserRole { get; set; }
    public int Level { get; set; }
    public DateTime CreatedAt { get; set; }
    public DateTime UpdateAt { get; set; }
    public bool IsVerify { get; set; }

    [JsonIgnore] public ICollection<UserLanguage> UserLanguages { get; set; } = new List<UserLanguage>();
    [JsonIgnore] public ICollection<QuizAnswer> QuizAnswers { get; set; } = new List<QuizAnswer>();
    [JsonIgnore] public ICollection<LeaderboardEntry> LeaderboardEntries { get; set; } = new List<LeaderboardEntry>();
    [JsonIgnore]public ICollection<CompletedLesson> CompletedLessons { get; set; } = new List<CompletedLesson>();
}