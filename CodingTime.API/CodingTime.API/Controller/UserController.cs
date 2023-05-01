using Application.Context.User;
using Application.Entities;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace CodingTime.API.Controller;
[ApiController]
[Route("[Controller]")]
public class UserController
{
    private readonly IMediator _mediator;

    public UserController(IMediator mediator)
    {
        _mediator = mediator;
    }

    [HttpPost]
    public async Task<ActionResult<User>> CreateUser(User user)
    {
        var commandResult = await _mediator.Send(new CreateUserCommand(user), new CancellationToken());
        return (commandResult);
    }
}