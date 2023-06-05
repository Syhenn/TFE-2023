using Application.Repositories;
using Domain.Dtos;
using MediatR;

namespace Application.Context.Quiz;

public record CreateQuizCommand(QuizDto quizDto) : IRequest<Entities.Quiz>;

public class CreateQuizHandler : IRequestHandler<CreateQuizCommand, Entities.Quiz>
{
    private readonly IQuizRepository _quizRepository;

    public CreateQuizHandler(IQuizRepository quizRepository)
    {
        _quizRepository = quizRepository;
    }

    public async Task<Entities.Quiz> Handle(CreateQuizCommand request, CancellationToken cancellationToken)
    {
        var quiz = new Entities.Quiz
        {
            FakeAnswerOne = request.quizDto.FalseAnswerOne,
            FakeAnswerTwo = request.quizDto.FalseAnswerTwo,
            CorrectAnswer = request.quizDto.CorrectAnswer,
            Name = request.quizDto.Name,
            Title = request.quizDto.Title
        };
        return await _quizRepository.CreateQuiz(quiz);
    }
}