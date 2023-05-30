using Application.Repositories;
using MediatR;

namespace Application.Context.Lesson;

public record GetLessonCommand(int lessonId) : IRequest<Entities.Lesson>;

public class GetLessonHandler: IRequestHandler<GetLessonCommand, Entities.Lesson>
{
    private readonly ILessonRepository _lessonRepository;

    public GetLessonHandler(ILessonRepository lessonRepository)
    {
        _lessonRepository = lessonRepository;
    }

    public async Task<Entities.Lesson> Handle(GetLessonCommand command, CancellationToken cancellationToken)
    {
        return await _lessonRepository.GetLessonAsync(command.lessonId);
    }
}