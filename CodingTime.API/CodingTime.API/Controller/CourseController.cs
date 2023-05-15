using Application.Context.Course;
using Application.Entities;
using Domain.Dtos;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace CodingTime.API.Controller;
[ApiController]
[Route("[Controller]")]
public class CourseController : ControllerBase
{
    private readonly IMediator _mediator;

    public CourseController(IMediator mediator)
    {
        _mediator = mediator;
    }
    [HttpPost]
    public async Task<ActionResult<Course>> CreateCourse(CourseDto courseDto)
    {
        var commandResult = await _mediator.Send(new CreateCourseCommand(courseDto));
        return commandResult;
    }
}