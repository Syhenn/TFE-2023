using API.Models;

namespace API.DTO;

public class UserLangageDto
{
    public int UserId { get; set; }
    public User User { get; set; }
    public int LangageId { get; set; }
    public Langage Langage { get; set; }
}