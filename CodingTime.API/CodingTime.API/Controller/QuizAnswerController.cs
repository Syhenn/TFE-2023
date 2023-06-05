using Application.Context.QuizAnswer;
using Application.Entities;
using Domain.Dtos;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace CodingTime.API.Controller;

[ApiController]
[Route("[Controller]")]
public class QuizAnswerController : ControllerBase
{
    private readonly IMediator _mediator;

    public QuizAnswerController(IMediator mediator)
    {
        _mediator = mediator;
    }

    [HttpPost]
    public async Task<ActionResult<QuizAnswer>> CreateQuiz(QuizAnswerDto quizAnswerDto)
    {
        return await _mediator.Send(new CreateQuizAnswerCommand(quizAnswerDto));
    }
}