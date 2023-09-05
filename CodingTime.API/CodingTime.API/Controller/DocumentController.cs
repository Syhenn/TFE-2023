using System.Reflection.Metadata;
using Application.Context.Document;
using Domain.Dtos;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace CodingTime.API.Controller;
[ApiController]
[Route("[Controller]")]
public class DocumentController : ControllerBase
{
    private readonly IMediator _mediator;

    public DocumentController(IMediator mediator)
    {
        _mediator = mediator;
    }

    [HttpPost]
    public async Task<ActionResult<Document>> CreateDocument(IFormFile pdfFile)
    {
        if (pdfFile == null || pdfFile.Length == 0)
        {
            return BadRequest("Le fichier PDF est vide ou n'a pas été fourni.");
        }

        using var memoryStream = new MemoryStream();
        await pdfFile.CopyToAsync(memoryStream);
        var pdfData = memoryStream.ToArray();
        var documentDto = new DocumentDto(pdfData);

        var commandResult = await _mediator.Send(new CreateDocumentCommand(documentDto));
        if (commandResult == null)
        {
            return BadRequest();
        }

        return Ok(commandResult);
    }
    [HttpGet]
    public async Task<ActionResult<Document>> GetDocument(int docId)
    {

        var commandResult = await _mediator.Send(new GetDocumentByIdCommand(docId));
        if (commandResult == null)
        {
            return BadRequest();
        }

        return Ok(commandResult);
    }
}