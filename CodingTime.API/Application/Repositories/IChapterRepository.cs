using Application.Entities;

namespace Application.Repositories;

public interface IChapterRepository
{
    Task<List<Chapter>> GetChaptersAsync();
    Task<List<Chapter>> GetChapterByCourse(int courseId);
    Task<Chapter> GetChapterAsync(int chapterId);
    Task<Chapter> CreateChapter(Chapter chapter);
    Task<Chapter> DeleteChapter(Chapter chapter);
    
}