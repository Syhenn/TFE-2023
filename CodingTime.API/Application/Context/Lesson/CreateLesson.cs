using Application.Repositories;
using Domain.Dtos;
using MediatR;

namespace Application.Context.Lesson;

public record CreateLessonCommand(LessonDto Lesson) : IRequest<Entities.Lesson>;
public class CreateLessonHandler : IRequestHandler<CreateLessonCommand, Entities.Lesson>
{
    private readonly ILessonRepository _lessonRepository;
    private readonly IChapterRepository _chapterRepository;

    public CreateLessonHandler(ILessonRepository lessonRepository, IChapterRepository chapterRepository)
    {
        _lessonRepository = lessonRepository;
        _chapterRepository = chapterRepository;
    }

    public async Task<Entities.Lesson> Handle(CreateLessonCommand command, CancellationToken cancellationToken)
    {
        var chapter = await _chapterRepository.GetChapterAsync(command.Lesson.ChapterId);
        var lesson = new Entities.Lesson()
        {
            ChapterId = chapter.Id,
            Chapter = chapter,
            CreatedAt = DateTime.Now,
            UpdatedAt = DateTime.Now,
            Title = command.Lesson.Title
        };
        var requestResult = await _lessonRepository.CreateLesson(lesson);
        return requestResult;
    }
}