using Application.Entities;
using Application.Repositories;
using Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Repositories;

public class QuizRepository : IQuizRepository
{
    private ApplicationDbContext _dbContext;

    public QuizRepository(ApplicationDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    public async Task<Quiz> CreateQuiz(Quiz quiz)
    {
        _dbContext.Quizzes.Add(quiz);
        await _dbContext.SaveChangesAsync();
        return quiz;
    }

    public async Task<Quiz> GetQuiz(int quizId)
    {
        var quiz= await _dbContext.Quizzes
            .FirstOrDefaultAsync(x => x.Id == quizId);
        return quiz;
    }

    public async Task<List<Quiz>> GetQuizzes()
    {
        return await _dbContext.Quizzes.ToListAsync();
    }
}