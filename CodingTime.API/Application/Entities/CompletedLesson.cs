namespace Application.Entities;

public class CompletedLesson
{
    public int Id { get; set; }
    public int UserId { get; set; }
    public int LessonId { get; set; }
    public User User { get; set; }
    public Lesson Lesson { get; set; }
}