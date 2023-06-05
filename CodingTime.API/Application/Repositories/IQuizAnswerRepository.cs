using Application.Entities;

namespace Application.Repositories;

public interface IQuizAnswerRepository
{
    Task<QuizAnswer> CreateQuizAnswer(QuizAnswer quizAnswer);
    Task<QuizAnswer> GetQuizAnswer(int quizAnswersId);
    Task<List<QuizAnswer>> GetQuizAnswers();
}