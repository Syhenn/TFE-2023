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

    [HttpGet]
    public async Task<ActionResult<List<Course>>> GetCourses()
    {
        return await _mediator.Send(new GetCoursesCommand());
    }
    [HttpGet]
    [Route("getByLanguage")]
    public async Task<ActionResult<Course>> GetCourseByLanguage(int languageId)
    {
        var commandResult = await _mediator.Send(new GetCourseByLanguageCommand(languageId));
        return commandResult;
    }

    [HttpGet]
    [Route("getByName")]
    public async Task<ActionResult<Course>> GetCourseByName(string CourseName)
    {
        var commandResult = await _mediator.Send(new GetCourseByNameCommand(CourseName));
        return Ok(commandResult);
    }
    [HttpPost]
    public async Task<ActionResult<Course>> CreateCourse(CourseDto courseDto)
    {
        var commandResult = await _mediator.Send(new CreateCourseCommand(courseDto));
        return commandResult;
    }
}