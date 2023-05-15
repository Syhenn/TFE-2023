using Application.Entities;

namespace Application.Repositories;

public interface ILessonRepository
{
    Task<List<Lesson>> GetLessonsAsync();
    Task<Lesson> GetLessonAsync(int lessonId);
    Task<Lesson> CreateLesson(Lesson lesson);
    Task<Lesson> DeleteLesson(Lesson lesson);
}