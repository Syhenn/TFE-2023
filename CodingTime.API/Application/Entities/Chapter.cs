using System.Text.Json.Serialization;

namespace Application.Entities;

public class Chapter
{
    public int Id { get; set; }
    public string Title { get; set; }

    public int CourseId { get; set; }
    public Course Course { get; set; }
    [JsonIgnore] public List<Lesson> Lessons { get; set; } = new List<Lesson>();
}