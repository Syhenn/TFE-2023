using APITEst.DTO;

namespace APITEst.Services;

public interface IUserService
{
    Task<List<UserDto>> GetUsersAsync();
    Task<UserDto> GetUserAsync(int userId);
    Task<UserDto> CreateUserAsync(UserDto userDto);
    Task<UserDto> UpdateUserAsync(int userId, UserDto userDto);
    Task DeleteUserAsync(int userId);
}
