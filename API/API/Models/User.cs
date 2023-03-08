namespace API.Models;

public class User
{
    public int Id { get; set; }
    public string Name { get; set; }
    public string Surname { get; set; }
    public string DisplayName { get; set; }
    public string Email { get; set; }
    public string Password { get; set; }
    public string Age { get; set; }
    
    public ICollection<UserLangage> UserLangages { get; set; }

}