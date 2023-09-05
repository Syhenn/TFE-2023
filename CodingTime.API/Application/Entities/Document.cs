namespace Application.Entities;

public class DocumentPdf
{
    public int Id { get; set; }
    public byte[] PdfData { get; set; }
    public int? LessonId { get; set; }
    public Lesson? Lesson { get; set; }
}