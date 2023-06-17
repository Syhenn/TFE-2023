using Application.Repositories;
using Domain.Dtos;
using MediatR;

namespace Application.Context.Lesson;

public record UpdateLessonCommand(LessonDto lessonDto) : IRequest<Entities.Lesson>;

public class UpdateLessonHandler : IRequestHandler<UpdateLessonCommand, Entities.Lesson>
{
    private readonly ILessonRepository _lessonRepository;

    public UpdateLessonHandler(ILessonRepository lessonRepository)
    {
        _lessonRepository = lessonRepository;
    }

    public async Task<Entities.Lesson> Handle(UpdateLessonCommand command, CancellationToken cancellationToken)
    {
        var lesson = await _lessonRepository.GetLessonAsync(command.lessonDto.Id);
        lesson.HtmlContent = command.lessonDto.HtmlContent;
        return await _lessonRepository.UpdateLesson(lesson);
    }
}