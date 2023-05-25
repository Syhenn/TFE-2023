using Application.Entities;

namespace Application.Repositories;

public interface ILessonRepository
{
    Task<List<Lesson>> GetLessonsAsync();
    Task<Lesson> GetLessonAsync(int lessonId);
    Task<List<Lesson>> GetLessonByChapter(int chapterId);
    Task<Lesson> CreateLesson(Lesson lesson);
    Task<Lesson> DeleteLesson(Lesson lesson);
}