using Application.Entities;
using Application.Repositories;
using Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Repositories;

public class UserRepository : IUserRepository
{
    private readonly ApplicationDbContext _context;

    public UserRepository(ApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<List<User>> GetUsersAsync()
    {
        return await _context.Users.ToListAsync();
    }

    public async Task<User> GetUserAsync(int userId)
    {
        return _context.Users
            .FirstOrDefault(x => x.Id == userId);
    }

    public async Task<User> GetUserByMailAsync(string email)
    {
        return _context.Users.FirstOrDefault(x => x.Email == email);
    }

    public async Task<User> GetUserByDisplayNameAsync(string displayName)
    {
        return _context.Users.FirstOrDefault(x => x.DisplayName == displayName);
    }
    
    public async Task<User> CreateUserAsync(User user)
    {
        _context.Users.Add(user);
        await _context.SaveChangesAsync();
        return user;
    }

    public async Task<User> DeleteUserAsync(User user)
    {
        _context.Remove(user);
        _context.SaveChangesAsync();
        return user;
    }
    public async Task<List<Language>> GetUserLanguagesAsync(int userId)
    {
        var user = await _context.Users
            .Include(u => u.UserLanguages)
            .ThenInclude(ul => ul.Language)
            .FirstOrDefaultAsync(u => u.Id == userId);

        if (user != null)
        {
            return user.UserLanguages.Select(ul => ul.Language).ToList();
        }

        return new List<Language>();
    }
}