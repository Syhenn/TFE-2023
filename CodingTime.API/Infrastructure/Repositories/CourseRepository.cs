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

    public async Task<Course> GetCourseAsync(int courseId)
    {
        return _context.Courses
            .FirstOrDefault(x => x.Id == courseId);
    }

    public async Task<Course> GetCourseByName(string courseName)
    {
        return await _context.Courses
            .FirstOrDefaultAsync(x => x.Title == courseName);
    }

    public async Task<List<Course>> GetCourseByLanguage(int languageId)
    {
        return await _context.Courses.Where(x => x.LanguageId == languageId).ToListAsync();
    }

    public async Task<Course> GetCourseIncluded(int courseId)
    {
        var course =  await _context.Courses
            .Include(c => c.Quizzes)
            .Include(x =>x.Chapters)
            .FirstOrDefaultAsync(c => c.Id == courseId);
        return course;
    }

    public async Task<Course> CreateCourseAsync(Course course)
    {
        _context.Courses.Add(course);
        await _context.SaveChangesAsync();
        return course;
    }

    public async Task<Course> UpdateCourse(Course course)
    {
        _context.Courses.Update(course);
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