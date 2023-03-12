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
        var passwordHash = BCrypt.Net.BCrypt.HashPassword(userDto.Password);
        
        var user = _mapper.Map<User>(userDto);
        user.Password = passwordHash;
        _context.Users.Add(user);
        await _context.SaveChangesAsync();
        return _mapper.Map<UserDto>(user);
    }

    public async Task<UserDto> UpdateUserAsync(int userId, UserDto userDto)
    {
        var user = await _context.Users.FindAsync(userId);
        if (user == null) return null;
        await _context.SaveChangesAsync();
        return _mapper.Map<UserDto>(user);
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

    public async Task<List<LangageDto>> GetLangagesByUserAsync(UserDto userDto)
    {
        var user = await _context.Users.Include(u => u.UserLangages)
            .ThenInclude(ul => ul.Langage)
            .FirstOrDefaultAsync(u => u.Id == userDto.Id);
        if (user == null)
        {
            return null;
        }
        var langages = user.UserLangages.Select(ul => ul.Langage).ToList();
        return _mapper.Map<List<LangageDto>>(langages);
    }
    public async Task<UserDto> Authenticate(string email, string password)
    {
        var user = await _context.Set<User>().SingleOrDefaultAsync(x => x.Email == email);
        if (user == null)
        {
            return null;
        }
        
        return BCrypt.Net.BCrypt.Verify(password, user.Password) ? _mapper.Map<UserDto>(user) : null;
    }
}