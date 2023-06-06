using System.Text.Json.Serialization;

namespace Application.Entities;

public class QuizAnswer
{
    public int Id { get; set; }
    public int UserId { get; set; }
    public int QuizId { get; set; }
    public int Points { get; set; }
    public DateTime AnsweredAt { get; set; }

    public User User { get; set; }
    [JsonIgnore] public Quiz Quiz { get; set; }
}