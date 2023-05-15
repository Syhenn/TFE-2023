using Application.Context.UserLanguage;
using Application.Entities;
using Domain.Dtos;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace CodingTime.API.Controller;

[ApiController]
[Route("[Controller]")]
public class UserLanguageController : ControllerBase
{
    private readonly IMediator _mediator;

    public UserLanguageController(IMediator mediator)
    {
        _mediator = mediator;
    }

    [HttpPut]
    public async Task<ActionResult<List<UserLanguage>>> GetUserLanguageForUser(int userId)
    {
        var commandResult = await _mediator.Send(new GetUserLanguageForUserCommand(userId));
        return Ok(commandResult);
    }
    [HttpPost]
    public async Task<ActionResult<UserLanguage>> CreateUserLanguage(UserLanguageDto userLanguageDto)
    {
        var commandResult = await _mediator.Send(new AddUserLanguageCommand(userLanguageDto));
        return Ok(commandResult);
    }
}