using Application.Entities;

namespace Application.Repositories;

public interface ICourseRepository
{
    Task<List<Course>> GetCoursesAsync();
    Task<Course> GetCourseAsync(int courseId);
    Task<Course> CreateCourseAsync(Course course);
    Task<Course> DeleteCourseAsync(Course course);
}