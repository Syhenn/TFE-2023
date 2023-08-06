using Application.Entities;
using Application.Repositories;
using Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Repositories;

public class CorrectAnswerRepository : ICorrectAnswerRepository
{
    private readonly ApplicationDbContext _context;

    public CorrectAnswerRepository(ApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<CorrectAnswer> CreateCorrectAnswerAsync(CorrectAnswer correctAnswer)
    {
        await _context.CorrectAnswers.AddAsync(correctAnswer);
        await _context.SaveChangesAsync();
        return correctAnswer;
    }

    public async Task<List<CorrectAnswer>> GetCorrectAnswersAsync()
    {
        return await _context.CorrectAnswers.ToListAsync();
    }

    public async Task<CorrectAnswer> GetCorrectAnswerByIdAsync(int correctAnswerId)
    {
        return await _context.CorrectAnswers.FirstOrDefaultAsync(x => x.CorrectAnswerId == correctAnswerId);
    }

    public async Task<CorrectAnswer> GetCorrectAnswerByQuizAndUser(int quizId, int userId)
    {
        return await _context.CorrectAnswers.FirstOrDefaultAsync(x => x.QuizId == quizId && x.UserId == userId);
    }
}