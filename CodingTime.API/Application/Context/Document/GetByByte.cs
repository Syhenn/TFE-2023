using Application.Entities;
using Application.Repositories;
using MediatR;

namespace Application.Context.Document;

public record GetDocumentPdfByByteCommand(byte[] pdfData) : IRequest<DocumentPdf>;
public class GetDocumentPdfByByteHandler : IRequestHandler<GetDocumentPdfByByteCommand, DocumentPdf>
{
    private readonly IDocumentRepository _document;

    public GetDocumentPdfByByteHandler(IDocumentRepository document)
    {
        _document = document;
    }

    public async Task<DocumentPdf> Handle(GetDocumentPdfByByteCommand command, CancellationToken cancellationToken)
    {
        return await _document.GetDocumentByByteAsync(command.pdfData);
    }
}