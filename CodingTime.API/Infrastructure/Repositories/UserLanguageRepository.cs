using Application.Entities;
using Application.Repositories;
using Infrastructure.Persistence;

namespace Infrastructure.Repositories;

public class UserLanguageRepository : IUserLanguageRepository
{
    private readonly ApplicationDbContext _context;

    public UserLanguageRepository(ApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<UserLanguage> GetUserLanguageByIdAsync(int id)
    {
        return _context.UserLanguages.FirstOrDefault(x => x.LanguageId == id);
    }
    
    public async Task<UserLanguage> CreateUserLanguageAsync(UserLanguage userLanguage)
    {
        _context.UserLanguages.Add(userLanguage);
        await _context.SaveChangesAsync();
        return userLanguage;
    }
}