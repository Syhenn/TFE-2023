using API.DTO;

namespace API.Services;

public interface ILangageService
{
    Task<List<LangageDto>> GetLangagesAsync();
    Task<LangageDto> GetLangageAsync(int langageId);
    Task<LangageDto> CreateLangageAsync(LangageDto langageDto);
    Task<LangageDto> UpdateLangageAsync(int langageId, LangageDto langageDto);
    Task DeleteLangageAsync(int langageId);
}