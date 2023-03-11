using API.Models;

namespace API.DTO;

public class Course
{
    public int Id { get; set; }
    public string Name { get; set; }
    public string Description { get; set; }
    public int DifficultyLevel { get; set; }
    public int LangageId { get; set; }
    public Langage Langage { get; set; }
}