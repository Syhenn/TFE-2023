using Application.Entities;
using Application.Repositories;
using Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Repositories;

public class CompletedLessonRepository : ICompletedLessonRepository
{
    private readonly ApplicationDbContext _context;

    public CompletedLessonRepository(ApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<CompletedLesson> CreateCompletedLesson(CompletedLesson completedLesson)
    {
        await _context.CompletedLessons.AddAsync(completedLesson);
        await _context.SaveChangesAsync();
        return completedLesson;
    }

    public Task<CompletedLesson> GetCompletedLesson(int completedLessonId)
    {
        throw new NotImplementedException();
    }

    public async Task<List<CompletedLesson>> GetCompletedLessonForUser(int userId)
    {
        return await _context.CompletedLessons.Where(x => x.UserId == userId).ToListAsync();
    }
}