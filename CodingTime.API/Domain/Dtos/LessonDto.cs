namespace Domain.Dtos;

public record LessonDto(int? Id,string Title, int ChapterId, string HtmlContent);