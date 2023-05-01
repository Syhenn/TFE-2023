using Application.Context.User;
using Application.Entities;
using MediatR;
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

    [HttpGet]
    public async Task<ActionResult<User>> GetUsers()
    {
        var commandResult = await _mediator.Send(new GetUsersCommand(), new CancellationToken());
        return Ok(commandResult);
    }

    [HttpGet("{userId}")]
    public async Task<ActionResult<User>> GetUsers(int userId)
    {
        var commandResult = await _mediator.Send(new GetUserByIdCommand(userId), new CancellationToken());
        return Ok(commandResult);
    }
    [HttpPost]
    public async Task<ActionResult<User>> CreateUser(User user)
    {
        var commandResult = await _mediator.Send(new CreateUserCommand(user), new CancellationToken());
        return Ok(commandResult);
    }
    [HttpPut]
    public async Task<ActionResult<User>> DeleteUser(User user)
    {
        var commandResult = await _mediator.Send(new DeleteUserCommand(user), new CancellationToken());
        return Ok(commandResult);
    }
}