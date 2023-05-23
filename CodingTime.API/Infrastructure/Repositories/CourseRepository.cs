using Application.Entities;
using Application.Repositories;
using Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Repositories;

public class CourseRepository : ICourseRepository
{
    private readonly ApplicationDbContext _context;

    public CourseRepository(ApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<List<Course>> GetCoursesAsync()
    {
        return await _context.Courses.ToListAsync();
    }

    public async  Task<Course> GetCourseAsync(int courseId)
    {
        return _context.Courses
            .FirstOrDefault(x => x.Id == courseId);
    }

    public async Task<Course> GetCourseByLanguage(int languageId)
    {
        return _context.Courses.FirstOrDefault(x => x.LanguageId == languageId);
    }

    public async Task<Course> CreateCourseAsync(Course course)
    {
        _context.Courses.Add(course);
        await _context.SaveChangesAsync();
        return course;
    }

    public async Task<Course> DeleteCourseAsync(Course course)
    {
        _context.Remove(course);
        await _context.SaveChangesAsync();
        return course;
    }
}