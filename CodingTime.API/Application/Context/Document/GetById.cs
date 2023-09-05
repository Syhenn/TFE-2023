using Application.Entities;
using Application.Repositories;
using MediatR;

namespace Application.Context.Document;

public record GetDocumentByIdCommand(int DocumentId) : IRequest<DocumentPdf>;
public class GetDocumentByIdHandler : IRequestHandler<GetDocumentByIdCommand, DocumentPdf>
{
    private readonly IDocumentRepository _documentRepository;

    public GetDocumentByIdHandler(IDocumentRepository documentRepository)
    {
        _documentRepository = documentRepository;
    }

    public async Task<DocumentPdf> Handle(GetDocumentByIdCommand command, CancellationToken cancellationToken)
    {
        return await _documentRepository.GetDocumentByIdAsync(command.DocumentId);
    }
}