namespace Application.Entities;

public class UserLanguage
{
    public int Id { get; set; }
    public int UserId { get; set; }
    public User User { get; set; }
    public int LanguageId { get; set; }
    public Language Language { get; set; }
}