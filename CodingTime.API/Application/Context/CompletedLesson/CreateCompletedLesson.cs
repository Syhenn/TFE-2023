using Application.Repositories;
using Domain.Dtos;
using MediatR;

namespace Application.Context.CompletedLesson;

public record CreateCompletedLessonCommand(CompletedLessonDto CompletedLessonDto) : IRequest<Entities.CompletedLesson>;
public class CreateCompletedLessonHanlder : IRequestHandler<CreateCompletedLessonCommand, Entities.CompletedLesson>
{
    private readonly ICompletedLessonRepository _completedLesson;
    private readonly IUserRepository _userRepository;
    private readonly ILessonRepository _lessonRepository;

    public CreateCompletedLessonHanlder(ICompletedLessonRepository completedLesson, IUserRepository userRepository, ILessonRepository lessonRepository)
    {
        _completedLesson = completedLesson;
        _userRepository = userRepository;
        _lessonRepository = lessonRepository;
    }

    public async Task<Entities.CompletedLesson> Handle(CreateCompletedLessonCommand command,
        CancellationToken cancellationToken)
    {
        var user = await _userRepository.GetUserAsync(command.CompletedLessonDto.UserId);
        var lesson = await _lessonRepository.GetLessonAsync(command.CompletedLessonDto.LessonId);
        var completedLesson = new Entities.CompletedLesson()
        {
            Lesson = lesson,
            User = user,
            LessonId = lesson.Id,
            UserId = user.Id
        };
        return await _completedLesson.CreateCompletedLesson(completedLesson);
    }
}