using System.Text.Json;
using System.Text.Json.Serialization;
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
    public async Task<ActionResult<QuizAnswer>> CreateQuizAnswer([FromBody]QuizAnswerDto quizAnswerDto)
    {

        return await _mediator.Send(new CreateQuizAnswerCommand(quizAnswerDto));
    } 
    [HttpGet]
    public async Task<ActionResult<List<QuizAnswer>>> GetQuizAnswers()
    {

        return await _mediator.Send(new GetQuizAnswerCommand());
    }
}