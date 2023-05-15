using Application.Entities;

namespace Application.Repositories;

public interface IUserLanguageRepository
{
    Task<UserLanguage> GetUserLanguageByIdAsync(int id);
    Task<UserLanguage> CreateUserLanguageAsync(UserLanguage userLanguage);
}