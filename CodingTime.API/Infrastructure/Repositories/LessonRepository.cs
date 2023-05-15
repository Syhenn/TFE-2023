using Application.Entities;
using Application.Repositories;
using Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Repositories;

public class LessonRepository : ILessonRepository
{
    private readonly ApplicationDbContext _context;

    public LessonRepository(ApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<List<Lesson>> GetLessonsAsync()
    {
        return await _context.Lessons.ToListAsync();
    }

    public async Task<Lesson> GetLessonAsync(int lessonId)
    {
        return await _context.Lessons.FirstOrDefaultAsync(x => x.Id == lessonId);
    }

    public async Task<Lesson> CreateLesson(Lesson lesson)
    {
        _context.Lessons.Add(lesson);
        await _context.SaveChangesAsync();
        return lesson;
    }

    public async Task<Lesson> DeleteLesson(Lesson lesson)
    {
        _context.Lessons.Remove(lesson);
        await _context.SaveChangesAsync();
        return lesson;
    }
}