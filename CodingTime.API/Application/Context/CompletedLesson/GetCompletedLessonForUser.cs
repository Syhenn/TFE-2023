using Application.Repositories;
using MediatR;

namespace Application.Context.CompletedLesson;

public record GetCompletedLessonForUserCommand(int userId) : IRequest<List<Entities.CompletedLesson>>;
public class GetCompletedLessonForUserHandler : IRequestHandler<GetCompletedLessonForUserCommand, List<Entities.CompletedLesson>>
{
    private readonly ICompletedLessonRepository _completedLessonRepository;

    public GetCompletedLessonForUserHandler(ICompletedLessonRepository completedLessonRepository)
    {
        _completedLessonRepository = completedLessonRepository;
    }

    public async Task<List<Entities.CompletedLesson>> Handle(GetCompletedLessonForUserCommand command,
        CancellationToken cancellationToken)
    {
        return await _completedLessonRepository.GetCompletedLessonForUser(command.userId);
    } 
}