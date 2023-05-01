using Application.Context.Language;
using Application.Entities;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace CodingTime.API.Controller;

[ApiController]
[Route("[Controller]")]
public class LanguageController
{
    private readonly IMediator _mediator;

    public LanguageController(IMediator mediator)
    {
        _mediator = mediator;
    }

    [HttpPost]
    public async Task<ActionResult<Language>> CreateLangage(Language langage)
    {
        var resultCommand = await _mediator.Send(new CreateLanguageCommand(langage));
        return resultCommand;
    }
}