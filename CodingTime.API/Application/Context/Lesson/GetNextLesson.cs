using Application.Repositories;
using MediatR;

namespace Application.Context.Lesson;

public record GetNextLessonCommand(int lessonId) : IRequest<Entities.Lesson>;
public class GetNextLessonHandler : IRequestHandler<GetNextLessonCommand, Entities.Lesson>
{
    private readonly ILessonRepository _lessonRepository;
    private readonly IChapterRepository _chapterRepository;

    public GetNextLessonHandler(ILessonRepository lessonRepository, IChapterRepository chapterRepository, ICourseRepository courseRepository)
    {
        _lessonRepository = lessonRepository;
        _chapterRepository = chapterRepository;
    }

    public async Task<Entities.Lesson> Handle(GetNextLessonCommand command, CancellationToken cancellationToken)
    {
        var lesson = await _lessonRepository.GetLessonAsync(command.lessonId);
        var chapter = await _chapterRepository.GetChapterAsync(lesson.ChapterId);
        var chaptersCours = await _chapterRepository.GetChapterByCourse(chapter.CourseId);
        var lessonList = new List<Entities.Lesson>();
        foreach (var chap in chaptersCours)
        {
            lessonList.AddRange(chap.Lessons);
        }
        return lessonList.FirstOrDefault(l => l.CreatedAt > lesson.CreatedAt);

    }
}