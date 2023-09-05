using System.Text.Json.Serialization;

namespace Application.Entities;

public class Lesson
{
    public int Id { get; set; }
    public string Title { get; set; }
    public DateTime CreatedAt { get; set; }
    public DateTime UpdatedAt { get; set; }
    
    public string? HtmlContent { get; set; }
    public int ChapterId { get; set; }
    public Chapter Chapter { get; set; }
    public int? DocumentId { get; set; }
    public DocumentPdf? DocumentPdf { get; set; }
}