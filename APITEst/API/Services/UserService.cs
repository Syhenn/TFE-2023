using APITEst.Data;
using APITEst.DTO;
using APITEst.Models;
using Microsoft.EntityFrameworkCore;

namespace APITEst.Services;

public class UserService : IUserService
{
    private readonly ApplicationDbContext _context;

    public UserService(ApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<List<UserDto>> GetUsersAsync()
    {
        var users = await _context.Users.ToListAsync();
        return users.Select(u => new UserDto { Id = u.Id, Name = u.Name }).ToList();
    }

    public async Task<UserDto> GetUserAsync(int userId)
    {
        var user = await _context.Users.FindAsync(userId);
        return user != null ? new UserDto { Id = user.Id, Name = user.Name } : null;
    }

    public async Task<UserDto> CreateUserAsync(UserDto userDto)
    {
        var user = new User { Name = userDto.Name };
        _context.Users.Add(user);
        await _context.SaveChangesAsync();
        return new UserDto { Id = user.Id, Name = user.Name };
    }

    public async Task<UserDto> UpdateUserAsync(int userId, UserDto userDto)
    {
        var user = await _context.Users.FindAsync(userId);
        if (user != null)
        {
            user.Name = userDto.Name;
            await _context.SaveChangesAsync();
            return new UserDto { Id = user.Id, Name = user.Name };
        }
        return null;
    }

    public async Task DeleteUserAsync(int userId)
    {
        var user = await _context.Users.FindAsync(userId);
        if (user != null)
        {
            _context.Users.Remove(user);
            await _context.SaveChangesAsync();
        }
    }
}