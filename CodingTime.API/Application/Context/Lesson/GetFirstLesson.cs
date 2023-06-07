using Application.Repositories;
using MediatR;

namespace Application.Context.Lesson;

public record GetFirstLessonCommand(int languageId) : IRequest<Entities.Lesson>;

public class GetFirstLessonHandler : IRequestHandler<GetFirstLessonCommand, Entities.Lesson>
{
    private readonly ILanguageRepository _languageRepository;
    private readonly IChapterRepository _chapterRepository;
    private readonly ICourseRepository _courseRepository;

    public GetFirstLessonHandler(ILanguageRepository languageRepository, IChapterRepository chapterRepository, ICourseRepository courseRepository)
    {
        _languageRepository = languageRepository;
        _chapterRepository = chapterRepository;
        _courseRepository = courseRepository;
    }

    public async Task<Entities.Lesson> Handle(GetFirstLessonCommand command, CancellationToken cancellationToken)
    {
        var language = await _languageRepository.GetLanguageAsync(command.languageId);
        
        if (language != null && language.Courses != null && language.Courses.Any())
        {
            var firstCourse = language.Courses.FirstOrDefault();
            var course = await _courseRepository.GetCourseIncluded(firstCourse.Id);
            
            if (firstCourse != null && course.Chapters != null && course.Chapters.Any())
            {
                var chapters = await _chapterRepository.GetChapterByCourse(course.Id);
                var firstChapter = chapters.FirstOrDefault();
                if (firstChapter != null && firstChapter.Lessons != null && firstChapter.Lessons.Any())
                {
                    var firstLesson = firstChapter.Lessons.OrderBy(l => l.CreatedAt).FirstOrDefault();
                    return firstLesson;
                }
            }
        }
        
        return null;
    }
}
