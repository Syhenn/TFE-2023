using Application.Context.CorrectAnswer;
using Domain.Dtos;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace CodingTime.API.Controller;
[ApiController]
[Route("[Controller]")]
public class CorrectAnswerController : ControllerBase
{
    private readonly IMediator _mediator;

    public CorrectAnswerController(IMediator mediator)
    {
        _mediator = mediator;
    }

    [HttpPost]
    public async Task<IActionResult> CreateCorrectAnswer(CorrectAnswerDto correctAnswerDto)
    {
        var commandResult = await _mediator.Send(new CreateCorrectAnswerCommand(correctAnswerDto));
        if (commandResult != null)
            return Ok(commandResult);
        return NotFound();
    }

    [HttpGet]
    public async Task<IActionResult> GetCorrectAnswerById(int correctAnswerId)
    {
        var commandResult = await _mediator.Send(new GetCorrectAnswerByIdCommand(correctAnswerId));
        if (commandResult != null)
            return Ok(commandResult);
        return NotFound();
    }

    [HttpGet]
    [Route("GetByQuizAndUser")]
    public async Task<IActionResult> GetCorrectAnswerByQuizAndUser(int quizId, int userId)
    {
        var correctAnswerDto = new CorrectAnswerDto(userId, quizId);
        var commandResult = await _mediator.Send(new GetCorrectAnswerByQuizAndUserCommand(correctAnswerDto));
        return commandResult != null ? Ok(commandResult) : NoContent();
    }

}
