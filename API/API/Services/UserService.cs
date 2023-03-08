using API.Data;
using API.DTO;
using API.Models;
using AutoMapper;
using Microsoft.EntityFrameworkCore;

namespace API.Services;

public class UserService : IUserService
{
    private readonly ApplicationDbContext _context;
    private readonly IMapper _mapper;

    public UserService(ApplicationDbContext context, IMapper mapper)
    {
        _context = context;
        _mapper = mapper;
    }

    public async Task<List<UserDto>> GetUsersAsync()
    {
        var users = await _context.Users.ToListAsync();
        return users.Select(u => _mapper.Map<UserDto>(u)).ToList();
    }

    public async Task<UserDto> GetUserAsync(int userId)
    {
        var user = await _context.Users.FindAsync(userId);
        var userDto = _mapper.Map<UserDto>(user);
        return userDto;
    }

    public async Task<UserDto> CreateUserAsync(UserDto userDto)
    {
        
        var user = _mapper.Map<User>(userDto);
        _context.Users.Add(user);
        await _context.SaveChangesAsync();
        return _mapper.Map<UserDto>(user);
    }

    public async Task<UserDto> UpdateUserAsync(int userId, UserDto userDto)
    {
        var user = await _context.Users.FindAsync(userId);
        if (user != null)
        {
            await _context.SaveChangesAsync();
            return _mapper.Map<UserDto>(user);
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