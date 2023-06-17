using Application.Context.Chapter;
using Application.Entities;
using Domain.Dtos;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace CodingTime.API.Controller;
[ApiController]
[Route("[Controller]")]
public class ChapterController : ControllerBase
{
    private readonly IMediator _mediator;

    public ChapterController(IMediator mediator)
    {
        _mediator = mediator;
    }
    [HttpGet]
    public async Task<ActionResult<Chapter>> GetChapters(int CourseId)
    {
        var commandResult = await _mediator.Send(new GetChapterByCourseCommand(CourseId));
        return Ok(commandResult);
    }
    [HttpGet]
    [Route("getByName")]
    public async Task<ActionResult<Chapter>> GetChapterByName(string chapterName)
    {
        var commandResult = await _mediator.Send(new GetChapterByNameCommand(chapterName));
        return Ok(commandResult);
    }
    
    [HttpPost]
    public async Task<ActionResult<Chapter>> CreateChapter(ChapterDto chapterDto)
    {
        var commandResult = await _mediator.Send(new CreateChapterCommand(chapterDto));
        return Ok(commandResult);
    }
    [HttpDelete("{chapterId}")]
    public async Task<ActionResult<Chapter>> DeleteChapter(int chapterId)
    {
        var commandResult = await _mediator.Send(new DeleteChapterCommand(chapterId));
        return Ok(commandResult);
    }
}