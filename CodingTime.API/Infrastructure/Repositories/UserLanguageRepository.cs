using Application.Entities;
using Application.Repositories;
using Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;

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
        return await _context.UserLanguages.FirstOrDefaultAsync(x => x.LanguageId == id);
    }

    public async Task<List<UserLanguage>> GetLanguagesForUser(int userId)
    {
        return await _context.UserLanguages
            .Include(x => x.Language)
            .Where(x => x.UserId == userId)
            .ToListAsync();
    }
    public async Task<UserLanguage> CreateUserLanguageAsync(UserLanguage userLanguage)
    {
        _context.UserLanguages.Add(userLanguage);
        await _context.SaveChangesAsync();
        return userLanguage;
    }
}