using Application.Entities;

namespace Application.Repositories;

public interface IFriendsRepository
{
    Task<Friends> CreateFriends(Friends friends);
    Task<Friends> GetFriendsById(int friendsId);
}