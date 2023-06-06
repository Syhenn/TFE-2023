using Application.Repositories;
using Domain.Dtos;
using MediatR;

namespace Application.Context.Quiz;

public record CreateQuizCommand(QuizDto quizDto) : IRequest<Entities.Quiz>;

public class CreateQuizHandler : IRequestHandler<CreateQuizCommand, Entities.Quiz>
{
    private readonly IQuizRepository _quizRepository;
    private readonly ICourseRepository _courseRepository;

    public CreateQuizHandler(IQuizRepository quizRepository, ICourseRepository courseRepository)
    {
        _quizRepository = quizRepository;
        _courseRepository = courseRepository;
    }

    public async Task<Entities.Quiz> Handle(CreateQuizCommand request, CancellationToken cancellationToken)
    {
        var course = await _courseRepository.GetCourseAsync(request.quizDto.CourseId);
        var quiz = new Entities.Quiz
        {
            FakeAnswerOne = request.quizDto.FalseAnswerOne,
            FakeAnswerTwo = request.quizDto.FalseAnswerTwo,
            CorrectAnswer = request.quizDto.CorrectAnswer,
            Name = request.quizDto.Name,
            Title = request.quizDto.Title,
            CourseId = course.Id,
            Course = course
        };
        return await _quizRepository.CreateQuiz(quiz);
    }
}