namespace API.Models;

public class Course
{
    public int Id { get; set; }
    public string Name { get; set; }
    public string Description { get; set; }
    public string DifficultyLevel { get; set; }
    public string ImageUrl { get; set; }

    public int LangageId { get; set; }
    public Langage Langage { get; set; }
}