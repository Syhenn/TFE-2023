using Application.Repositories;
using Domain.Dtos;
using MediatR;

namespace Application.Context.Document;

public record CreateDocumentCommand(DocumentDto DocumentDto) : IRequest<Entities.DocumentPdf>;

public class CreateDocumentHandler : IRequestHandler<CreateDocumentCommand, Entities.DocumentPdf>
{
    private readonly IDocumentRepository _documentRepository;

    public CreateDocumentHandler(IDocumentRepository documentRepository)
    {
        _documentRepository = documentRepository;
    }

    public async Task<Entities.DocumentPdf> Handle(CreateDocumentCommand command, CancellationToken cancellationToken)
    {
        var doc = new Entities.DocumentPdf()
        {
            PdfData = command.DocumentDto.PdfData
        };
        var repositoryResult = await _documentRepository.CreateDocumentAsync(doc);
        return repositoryResult;
    }
}