using Application.Entities;
using Application.Repositories;
using Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Repositories;

public class DocumentRepository : IDocumentRepository
{
    private readonly ApplicationDbContext _context;

    public DocumentRepository(ApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<DocumentPdf> CreateDocumentAsync(DocumentPdf document)
    {
        await _context.DocumentPdfs.AddAsync(document);
        await _context.SaveChangesAsync();
        return document;
    }

    public async Task<DocumentPdf> GetDocumentByByteAsync(byte[] pdfData)
    {
        var pdf = await _context.DocumentPdfs.FirstOrDefaultAsync(d => d.PdfData == pdfData);
        return pdf;
    }
    public async Task<DocumentPdf> GetDocumentByIdAsync(int DocumentId)
    {
        var pdf = await _context.DocumentPdfs.FirstOrDefaultAsync(d => d.Id == DocumentId);
        return pdf;
    }

    public async Task<DocumentPdf> UpdateDocumentAsync(DocumentPdf documentPdf)
    {
        _context.DocumentPdfs.Update(documentPdf);
        await _context.SaveChangesAsync();
        return documentPdf;
    }
}