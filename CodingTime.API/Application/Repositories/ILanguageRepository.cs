using Application.Entities;

namespace Application.Repositories;

public interface ILanguageRepository
{
    Task<List<Language>> GetLanguagesAsync();
    Task<Language?> GetLanguageByNameAsync(string name);
    Task<Language> GetLanguageAsync(int languageId);
    Task<Language> CreateLanguageAsync(Language language);
    Task<Language> DeleteLanguageAsync(Language language);
}