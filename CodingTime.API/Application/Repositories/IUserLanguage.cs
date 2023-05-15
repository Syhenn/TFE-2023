using Application.Entities;

namespace Application.Repositories;

public interface IUserLanguageRepository
{
    Task<UserLanguage> GetUserLanguageByIdAsync(int id);
    Task<List<UserLanguage>> GetLanguagesForUser(int userId);
    Task<UserLanguage> CreateUserLanguageAsync(UserLanguage userLanguage);
}