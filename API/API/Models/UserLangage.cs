namespace API.Models;

public class UserLangage
{
    public int UserId { get; set; }
    public User User { get; set; }
    public int LangageId { get; set; }
    public Langage Langage { get; set; }
}