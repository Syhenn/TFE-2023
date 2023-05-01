namespace Application.Entities;

public class UserLanguage
{
    public int UserId { get; set; }
    public User User { get; set; }
    public int LangageId { get; set; }
    public Language Langage { get; set; }
}