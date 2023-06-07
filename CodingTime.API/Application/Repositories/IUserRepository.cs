using Application.Entities;

namespace Application.Repositories;

public interface IUserRepository
{
    Task<List<User>> GetUsersAsync();    
    Task<User> GetUserByMailAsync(string email);
    Task<User> GetUserByDisplayNameAsync(string displayName);
    Task<User> UpdateUserAsync(User user);
    Task<User> GetUserAsync(int userId);
    Task<User> CreateUserAsync(User user);
    Task<User> DeleteUserAsync(User userId);
    Task<List<Language>> GetUserLanguagesAsync(int userId);

}