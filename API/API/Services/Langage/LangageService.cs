using API.Data;
using API.DTO;
using API.Models;
using AutoMapper;
using Microsoft.EntityFrameworkCore;

namespace API.Services;

public class LangageService: ILangageService
{
    private readonly IMapper _mapper;
    private readonly ApplicationDbContext _context;

    public LangageService(IMapper mapper, ApplicationDbContext context)
    {
        _mapper = mapper;
        _context = context;
    }

    public async Task<List<LangageDto>> GetLangagesAsync()
    {
        var langages = await _context.Langages.ToListAsync();
        return langages.Select(l => _mapper.Map<LangageDto>(l)).ToList();
    }

    public async Task<LangageDto> GetLangageAsync(int langageId)
    {
        var langage = await _context.Langages.FindAsync(langageId);
        return _mapper.Map<LangageDto>(langage);
    }

    public async Task<LangageDto> CreateLangageAsync(LangageDto langageDto)
    {
        var langage = _mapper.Map<Langage>(langageDto);
        _context.Langages.Add(langage);
        await _context.SaveChangesAsync();
        return _mapper.Map<LangageDto>(langage);
    }
    public async Task<LangageDto> UpdateLangageAsync(int langageId, LangageDto langageDto)
    {
        var langage = await _context.Langages.FindAsync(langageId);
        if (langage != null)
        {
            _mapper.Map(langageDto, langage);
            await _context.SaveChangesAsync();
            return _mapper.Map<LangageDto>(langage);
        }
        return null;
    }

    public async Task DeleteLangageAsync(int langageId)
    {
        var langage = await _context.Langages.FindAsync(langageId);
        if (langage != null)
        {
            _context.Langages.Remove(langage);
            await _context.SaveChangesAsync();
        }
    }

    public async Task<List<UserDto>> GetUserByLangageAsync(LangageDto langageDto)
    {
        var langage = await _context.Langages.Include(l => l.UserLangages)
            .ThenInclude(ul => ul.Langage)
            .FirstOrDefaultAsync(u => u.Id == langageDto.Id);
        if (langage == null)
        {
            return null;
        }

        var langages = langage.UserLangages.Select(ul => ul.Langage).ToList();
        return _mapper.Map<List<UserDto>>(langages);
    }
    
}