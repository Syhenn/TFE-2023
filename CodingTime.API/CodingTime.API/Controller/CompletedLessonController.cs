using Application.Context.CompletedLesson;
using Application.Entities;
using Domain.Dtos;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace CodingTime.API.Controller;
[ApiController]
[Route("[Controller]")]
public class CompletedLessonController : ControllerBase
{
    private readonly IMediator _mediator;

    public CompletedLessonController(IMediator mediator)
    {
        _mediator = mediator;
    }

    [HttpPost]
    public async Task<ActionResult<CompletedLesson>> CreateCompletedLesson(CompletedLessonDto completedLessonDto)
    {
        return await _mediator.Send(new CreateCompletedLessonCommand(completedLessonDto));
    }
    [HttpGet]
    public async Task<ActionResult<List<CompletedLesson>>> GetCompletedLessonForUser(int userId)
    {
        return await _mediator.Send(new GetCompletedLessonForUserCommand(userId));
    }
}