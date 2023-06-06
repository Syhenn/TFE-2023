using Application.Entities;

namespace Application.Repositories;

public interface ICompletedLessonRepository
{
    Task<CompletedLesson> CreateCompletedLesson(CompletedLesson completedLesson);
    Task<CompletedLesson> GetCompletedLesson(int completedLessonId);
    Task<List<CompletedLesson>> GetCompletedLessonForUser(int userId);
}