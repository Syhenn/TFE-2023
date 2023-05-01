using Application.Entities;

namespace Application.Repositories;

public interface IUserRepository
{
    Task<List<User>> GetUsersAsync();
    Task<User> GetUserAsync(int userId);
    Task<User> CreateUserAsync(User user);
    Task<User> DeleteUserAsync(User userId);
}