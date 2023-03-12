using API.DTO;
using API.Models;

namespace API.Services;

public interface IUserService
{
    Task<List<UserDto>> GetUsersAsync();
    Task<UserDto> GetUserAsync(int userId);
    Task<UserDto> CreateUserAsync(UserDto userDto);
    Task<UserDto> UpdateUserAsync(int userId, UserDto userDto);
    Task DeleteUserAsync(int userId);
    Task<List<LangageDto>> GetLangagesByUserAsync(UserDto userDto);
    Task<UserDto> AuthenticateAsync(string email, string password);
}
