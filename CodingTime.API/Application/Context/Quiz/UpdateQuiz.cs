using Application.Context.Lesson;
using Application.Repositories;
using Domain.Dtos;
using MediatR;

namespace Application.Context.Quiz;

public record UpdateQuizCommand(QuizDto QuizDto) : IRequest<Entities.Quiz>;

public class UpdateQuizHandler : IRequestHandler<UpdateQuizCommand, Entities.Quiz>
{
    private readonly IQuizRepository _quizRepository;

    public UpdateQuizHandler(IQuizRepository quizRepository)
    {
        _quizRepository = quizRepository;
    }

    public async Task<Entities.Quiz> Handle(UpdateQuizCommand command, CancellationToken cancellationToken)
    {
        var quiz = await _quizRepository.GetQuiz(command.QuizDto.Id);
        quiz.CorrectAnswer = command.QuizDto.CorrectAnswer;
        quiz.FakeAnswerOne = command.QuizDto.FalseAnswerOne;
        quiz.FakeAnswerTwo = command.QuizDto.FalseAnswerTwo;
        quiz.Title = command.QuizDto.Title;
        quiz.Name = command.QuizDto.Name;
        return await _quizRepository.UpdateQuiz(quiz);
    }
}