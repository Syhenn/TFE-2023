using Application.Context.Quiz;
using Application.Entities;
using Domain.Dtos;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace CodingTime.API.Controller;

[ApiController]
[Route("[Controller]")]
public class QuizController : ControllerBase
{
    private readonly IMediator _mediator;

    public QuizController(IMediator mediator)
    {
        _mediator = mediator;
    }

    [HttpPost]
    public async Task<ActionResult<Quiz>> CreateQuiz(QuizDto quizDto)
    {
        var commandResult = await _mediator.Send(new CreateQuizCommand(quizDto));
        return Ok(commandResult);
    }

    [HttpGet]
    public async Task<ActionResult<Quiz>> GetQuiz(int quizId)
    {
        var commandResult = await _mediator.Send(new GetQuizCommand(quizId));
        return Ok(commandResult);
    }
}