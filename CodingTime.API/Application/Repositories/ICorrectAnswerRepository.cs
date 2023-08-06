using Application.Entities;

namespace Application.Repositories;

public interface ICorrectAnswerRepository
{
    Task<CorrectAnswer> CreateCorrectAnswerAsync(CorrectAnswer correctAnswer);
    Task<List<CorrectAnswer>> GetCorrectAnswersAsync();
    Task<CorrectAnswer> GetCorrectAnswerByIdAsync(int correctAnswerId);
    Task<CorrectAnswer> GetCorrectAnswerByQuizAndUser(int quizId, int userId);
}