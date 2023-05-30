﻿using Application.Context.Lesson;
using Application.Entities;
using Domain.Dtos;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace CodingTime.API.Controller;
[ApiController]
[Route("[Controller]")]
public class LessonController : ControllerBase
{
    private readonly IMediator _mediator;

    public LessonController(IMediator mediator)
    {
        _mediator = mediator;
    }

    [HttpPost]
    public async Task<ActionResult<Lesson>> CreateLesson(LessonDto lessonDto)
    {
        var commandResult = await _mediator.Send(new CreateLessonCommand(lessonDto));
        return Ok(commandResult);
    }
    [HttpGet]
    [Route("getByChapter")]
    public async Task<ActionResult<Lesson>> CreateLesson(int chapterId)
    {
        var commandResult = await _mediator.Send(new GetLessonByChapterCommand(chapterId));
        return Ok(commandResult);
    }
}