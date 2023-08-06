using System.Text.Json.Serialization;

namespace Application.Entities;

public class CorrectAnswer
{
    public int CorrectAnswerId { get; set; }
    public int QuizId { get; set; }
    public int UserId { get; set; }
    public DateTime AnswerAt { get; set; }
    [JsonIgnore] public User User { get; set; }
    [JsonIgnore] public Quiz Quiz { get; set; }
}