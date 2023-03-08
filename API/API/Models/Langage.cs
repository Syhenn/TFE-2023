namespace API.Models;

public class Langage
{
    public int Id { get; set; }
    public string Name { get; set; }
    public string Description { get; set; }
    
    public ICollection<UserLangage> UserLangages { get; set; }
}