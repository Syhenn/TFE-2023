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
    
    [HttpPost]
    public async Task<ActionResult<User>> CreateUser(UserDto userDto)
    {
        var commandResult = await _mediator.Send(new CreateUserCommand(userDto), new CancellationToken());
        return Ok(commandResult);
    }
    [Authorize]
    [HttpPut]
    public async Task<ActionResult<User>> DeleteUser(User user)
    {
        var commandResult = await _mediator.Send(new DeleteUserCommand(user), new CancellationToken());
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