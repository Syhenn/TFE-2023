using Application.Entities;
using Application.Repositories;
using Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Repositories;

public class ChapterRepository : IChapterRepository
{
    private readonly ApplicationDbContext _context;

    public ChapterRepository(ApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<List<Chapter>> GetChaptersAsync()
    {
        return await _context.Chapters.ToListAsync();
    }

    public async Task<Chapter> GetChapterAsync(int chapterId)
    {
        return await _context.Chapters
            .FirstOrDefaultAsync(x => x.Id == chapterId);

    }

    public async Task<List<Chapter>> GetChapterByCourse(int courseId)
    {
        return await _context.Chapters            
            .Include(x => x.Course)
            .Where(x => x.CourseId == courseId)
            .ToListAsync();
    }

    public async Task<Chapter> CreateChapter(Chapter chapter)
    {
        _context.Chapters.Add(chapter);
        await _context.SaveChangesAsync();
        return chapter;
    }

    public async Task<Chapter> DeleteChapter(Chapter chapter)
    {
        _context.Chapters.Remove(chapter);
        _context.SaveChangesAsync();
        return chapter;
    }
}