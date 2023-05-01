using Application.Entities;

namespace Application.Repositories;

public interface IUserLanguageRepository
{
    Task<UserLanguage> CreateUserLanguage(UserLanguage userLanguage);
}