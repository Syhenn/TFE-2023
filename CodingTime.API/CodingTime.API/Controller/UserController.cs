using System.Security.Claims;
using Application.Context.User;
using Application.Entities;
using Domain.Dtos;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace CodingTime.API.Controller;

[ApiController]
[Route("[Controller]")]
public class UserController : ControllerBase
{
    private readonly IMediator _mediator;

    public UserController(IMediator mediator)
    {
        _mediator = mediator;
    }
    [Authorize]
    [HttpGet]
    public async Task<ActionResult<User>> GetUsers()
    {
        var commandResult = await _mediator.Send(new GetUsersCommand(), new CancellationToken());
        return Ok(commandResult);
    }
    [Authorize]
    [HttpGet("{userId}")]
    public async Task<ActionResult<User>> GetUser(int userId)
    {
        var commandResult = await _mediator.Send(new GetUserByIdCommand(userId), new CancellationToken());
        return Ok(commandResult);
    }
    [HttpGet]
    [Route("userMail")]
    public async Task<ActionResult<User>> GetUserByMail(string email)
    {
        var commandResult = await _mediator.Send(new GetUserByMailCommand(email), new CancellationToken());
        return Ok(commandResult);
    }
    [HttpPost]
    public async Task<ActionResult<User>> CreateUser(UserDto userDto)
    {
        var commandResult = await _mediator.Send(new CreateUserCommand(userDto));
        return Ok(commandResult);
    }
    [HttpPost]
    [Route("verify-user-data")]
    public async Task<ActionResult> VerifyUserData(UserDto userDto)
    {
        var commandResult = await _mediator.Send(new UserDataValidationCommand(userDto));
        if (commandResult.IsT0)
            return Ok(commandResult.AsT0);
        return Content(commandResult.AsT1.Message);

    }

    [HttpGet]
    [Route("userLanguage")]
    public async Task<ActionResult<List<UserLanguage>>> GetUserLanguage(int userId)
    {
        var commandResult = await _mediator.Send(new GetUserLanguageCommand(userId));
        return Ok(commandResult);
    }
    [HttpPut]
    public async Task<ActionResult<List<UserLanguage>>> UpdateUser(UserDto userDto)
    {
        var commandResult = await _mediator.Send(new UpdateUserCommand(userDto));
        return Ok(commandResult);
    }
    [Authorize]
    [HttpDelete]
    public async Task<ActionResult<User>> DeleteUser(string email)
    {
        var commandResult = await _mediator.Send(new DeleteUserCommand(email));
        return Ok(commandResult);
    }
    [Authorize]
    [HttpGet("current-user")]
    public async Task<ActionResult<User>> GetCurrentUser()
    {
        var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        var user = await _mediator.Send(new GetUserByIdCommand(int.Parse(userId)), new CancellationToken());
        return Ok(user);
    }
}