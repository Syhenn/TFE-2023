using Application.Entities;

namespace Application.Repositories;

public interface IQuizRepository
{
    Task<Quiz> CreateQuiz(Quiz quiz);
    Task<Quiz> GetQuiz(int? quizId);
    Task<Quiz> UpdateQuiz(Quiz quiz);
    Task<List<Quiz>> GetQuizzes();
}