using Application.Repositories;
using Domain.Dtos;
using MediatR;

namespace Application.Context.QuizAnswer;

public record CreateQuizAnswerCommand(QuizAnswerDto quizAnswerDto) : IRequest<Entities.QuizAnswer>;
public class CreateQuizAnswerHandler : IRequestHandler<CreateQuizAnswerCommand, Entities.QuizAnswer>
{
    private readonly IQuizAnswerRepository _quizAnswerRepository;
    private readonly IQuizRepository _quizRepository;
    private readonly IUserRepository _userRepository;

    public CreateQuizAnswerHandler(IQuizAnswerRepository quizAnswerRepository, IQuizRepository quizRepository, IUserRepository userRepository)
    {
        _quizAnswerRepository = quizAnswerRepository;
        _quizRepository = quizRepository;
        _userRepository = userRepository;
    }

    public async Task<Entities.QuizAnswer> Handle(CreateQuizAnswerCommand command, CancellationToken cancellationToken)
    {
        var quiz = await _quizRepository.GetQuiz(command.quizAnswerDto.QuizId);
        var user = await _userRepository.GetUserAsync(command.quizAnswerDto.UserId);
        var quizAnswer = new Entities.QuizAnswer
        {
            AnsweredAt = DateTime.Now,
            QuizId = command.quizAnswerDto.QuizId,
            UserId = command.quizAnswerDto.UserId,
            Points = command.quizAnswerDto.Points,
            Quiz = quiz,
            User = user
        };
        return await _quizAnswerRepository.CreateQuizAnswer(quizAnswer);
    }
}