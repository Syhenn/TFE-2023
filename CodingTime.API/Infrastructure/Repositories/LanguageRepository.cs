using Application.Entities;
using Application.Repositories;
using Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Repositories;

public class LanguageRepository : ILanguageRepository
{
    private readonly ApplicationDbContext _context;

    public LanguageRepository(ApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<List<Language>> GetLanguagesAsync()
    {
        return await _context.Langages.ToListAsync();
    }

    public async Task<Language> GetLanguageAsync(int langageId)
    {
        return _context.Langages
            .FirstOrDefault(x => x.Id == langageId);
    }

    public async Task<Language> CreateLanguageAsync(Language langage)
    {
        _context.Add(langage);
        await _context.SaveChangesAsync();
        return langage;
    }

    public async Task<Language> DeleteLanguageAsync(Language language)
    {
        _context.Remove(language);
        await _context.SaveChangesAsync();
        return language;
    }
}