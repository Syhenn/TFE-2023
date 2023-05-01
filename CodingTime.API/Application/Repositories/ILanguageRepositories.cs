using Application.Entities;

namespace Application.Repositories;

public interface ILanguageRepositories
{
    Task<List<Language>> GetLanguagesAsync();
    Task<Language> GetLanguageAsync(int languageId);
    Task<Language> CreateLanguageAsync(Language language);
    Task<Language> DeleteLanguageAsync(Language language);
}