using API.DTO;
using API.Services;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;
[ApiController]
[Route("[Controller]")]
public class LangageController : ControllerBase
{
    private readonly ILangageService _langageService;

    public LangageController(ILangageService langageService)
    {
        _langageService = langageService;
    }
    [HttpGet]
    public async Task<ActionResult<List<LangageDto>>> GetLangages()
    {
        var users = await _langageService.GetLangagesAsync();
        return Ok(users);
    }

    [HttpGet("{langageId}")]
    public async Task<ActionResult<LangageDto>> GetLangage(int langageId)
    {
        var langageDto = await _langageService.GetLangageAsync(langageId);
        if (langageDto == null)
        {
            return NotFound();
        }

        return Ok(langageDto);
    }
    [HttpPut("{langageId}")]
    public async Task<ActionResult<LangageDto>> UpdateUserAsync(int langageId, LangageDto langageDto)
    {
        var updatedLangage = await _langageService.UpdateLangageAsync(langageId, langageDto);
        if (updatedLangage == null)
        {
            return NotFound();
        }
        return Ok(updatedLangage);
    }
    [HttpPost]
    public async Task<ActionResult<LangageDto>> CreateLangage(LangageDto langageDto)
    {
        var createdLangage = await _langageService.CreateLangageAsync(langageDto);
        return createdLangage;
    }

    [HttpDelete("{langageId}")]
    public async Task<IActionResult> DeleteLangage(int langageId)
    {
        await _langageService.DeleteLangageAsync(langageId);
        return NoContent();
    }

}