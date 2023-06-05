using Application.Repositories;
using MediatR;

namespace Application.Context.Quiz;

public record GetQuizCommand(int quizId) : IRequest<Entities.Quiz>;
public class GetQuizHandler : IRequestHandler<GetQuizCommand, Entities.Quiz>
{
    private readonly IQuizRepository _quizRepository;

    public GetQuizHandler(IQuizRepository quizRepository)
    {
        _quizRepository = quizRepository;
    }

    public async Task<Entities.Quiz> Handle(GetQuizCommand command, CancellationToken cancellationToken)
    {
        return await _quizRepository.GetQuiz(command.quizId);
    }
}