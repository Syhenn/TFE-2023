using Application.Context.Language;
using Application.Context.UserLanguage;
using Application.Entities;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace CodingTime.API.Controller;

[ApiController]
[Route("[Controller]")]
public class LanguageController : ControllerBase
{
    private readonly IMediator _mediator;

    public LanguageController(IMediator mediator)
    {
        _mediator = mediator;
    }
    [HttpGet]
    public async Task<ActionResult<User>> GetLanguages()
    {
        var commandResult = await _mediator.Send(new GetLanguageCommand(), new CancellationToken());
        return Ok(commandResult);
    }    
    [HttpGet]
    [Route("UserLanguage")]
    public async Task<ActionResult<UserLanguage>> GetLanguageByName(string name)
    {
        var commandResult = await _mediator.Send(new GetLanguageByNameCommand(name));
        return Ok(commandResult);
    }
    [HttpGet("{languageId}")]
    public async Task<ActionResult<User>> GetLanguage(int  languageId)
    {
        var commandResult = await _mediator.Send(new GetLanguageByIdCommand(languageId), new CancellationToken());
        return Ok(commandResult);
    }
    [HttpPost]
    public async Task<ActionResult<Language>> CreateLanguage(Language language)
    {
        var resultCommand = await _mediator.Send(new CreateLanguageCommand(language));
        return resultCommand;
    }
    [HttpPut]
    public async Task<ActionResult<Language>> DeleteLanguage(Language language)
    {
        var commandResult = await _mediator.Send(new DeleteLanguageCommand(language), new CancellationToken());
        return Ok(commandResult);
    }
}