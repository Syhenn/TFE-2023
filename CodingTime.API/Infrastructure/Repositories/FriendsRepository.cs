using Application.Entities;
using Application.Repositories;
using Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Repositories;

public class FriendsRepository : IFriendsRepository
{
    private readonly ApplicationDbContext _Context;

    public FriendsRepository(ApplicationDbContext context)
    {
        _Context = context;
    }

    public async Task<Friends> CreateFriends(Friends friends)
    {
        _Context.UsersRelation.Add(friends);
        await _Context.SaveChangesAsync();
        return friends;
    }

    public async Task<Friends> GetFriendsById(int friendsId)
    {
        return await _Context.UsersRelation.FirstOrDefaultAsync(x => x.id == friendsId);
    }
}