using Application.Repositories;
using MediatR;

namespace Application.Context.Lesson;

public record DeleteLessonCommand(int lessonId) : IRequest<Entities.Lesson>;

public class DeleteLessonHandler : IRequestHandler<DeleteLessonCommand, Entities.Lesson>
{
    private readonly ILessonRepository _lessonRepository;

    public DeleteLessonHandler(ILessonRepository lessonRepository)
    {
        _lessonRepository = lessonRepository;
    }

    public async Task<Entities.Lesson> Handle(DeleteLessonCommand command, CancellationToken cancellationToken)
    {
        var lesson = await _lessonRepository.GetLessonAsync(command.lessonId);
        return await _lessonRepository.DeleteLesson(lesson);
    }
}