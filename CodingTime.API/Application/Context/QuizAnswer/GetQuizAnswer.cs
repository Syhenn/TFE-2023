using Application.Repositories;
using Domain.Dtos;
using MediatR;

namespace Application.Context.QuizAnswer;
public record GetQuizAnswerCommand: IRequest<List<Entities.QuizAnswer>>;

public class GetQuizAnswerHandler : IRequestHandler<GetQuizAnswerCommand, List<Entities.QuizAnswer>>
{
    private readonly IQuizAnswerRepository _quizAnswerRepository;

    public GetQuizAnswerHandler(IQuizAnswerRepository quizAnswerRepository)
    {
        _quizAnswerRepository = quizAnswerRepository;
    }

    public async Task<List<Entities.QuizAnswer>> Handle(GetQuizAnswerCommand command, CancellationToken cancellationToken)
    {
        return await _quizAnswerRepository.GetQuizAnswers();
    } 
}