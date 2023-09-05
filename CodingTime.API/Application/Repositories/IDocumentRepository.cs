
using Application.Entities;

namespace Application.Repositories;

public interface IDocumentRepository
{
    Task<DocumentPdf> CreateDocumentAsync(DocumentPdf document);
    Task<DocumentPdf> GetDocumentByByteAsync(byte[] pdfData);
    Task<DocumentPdf> GetDocumentByIdAsync(int DocumentId);
    Task<DocumentPdf> UpdateDocumentAsync(DocumentPdf documentPdf);
}