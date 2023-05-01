using System.Text.Json.Serialization;

namespace Application.Entities;

public class Language
{
    public int Id { get; set; }
    public string Name { get; set; }
    public string Description { get; set; }
    [JsonIgnore] public ICollection<UserLanguage> UserLanguages { get; set; } = new List<UserLanguage>();
}