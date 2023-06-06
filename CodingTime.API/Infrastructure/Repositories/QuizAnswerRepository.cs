using Application.Entities;
using Application.Repositories;
using Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Repositories;

public class QuizAnswerRepository : IQuizAnswerRepository
{
    private readonly ApplicationDbContext _context;

    public QuizAnswerRepository(ApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<QuizAnswer> CreateQuizAnswer(QuizAnswer quizAnswer)
    {
        await _context.QuizAnswers.AddAsync(quizAnswer);
        await _context.SaveChangesAsync();
        return quizAnswer;
    }

    public async Task<QuizAnswer> GetQuizAnswer(int quizAnswersId)
    {
        return await _context.QuizAnswers.FirstOrDefaultAsync(x => x.Id == quizAnswersId);
    }

    public async Task<List<QuizAnswer>> GetQuizAnswers()
    {
        return await _context.QuizAnswers
            .Include(x => x.User)
            .ToListAsync();
    }
}