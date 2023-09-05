using Application.Repositories;
using Domain.Dtos;
using MediatR;

namespace Application.Context.Lesson;

public record CreateLessonPdfCommand(LessonPdfDto LessonPdfDto) : IRequest<Entities.Lesson>;
public class CreateLessonPdfHandler : IRequestHandler<CreateLessonPdfCommand, Entities.Lesson>
{
    private readonly ILessonRepository _lessonRepository;
    private readonly IChapterRepository _chapterRepository;
    private readonly IDocumentRepository _documentRepository;
    public CreateLessonPdfHandler(ILessonRepository lessonRepository, IChapterRepository chapterRepository, IDocumentRepository documentRepository)
    {
        _lessonRepository = lessonRepository;
        _chapterRepository = chapterRepository;
        _documentRepository = documentRepository;
    }

    public async Task<Entities.Lesson> Handle(CreateLessonPdfCommand command, CancellationToken cancellationToken)
    {
        var chapter = await _chapterRepository.GetChapterAsync(command.LessonPdfDto.ChapterId);
        var document = await _documentRepository.GetDocumentByIdAsync(command.LessonPdfDto.DocumentPdfId);
        var lesson = new Entities.Lesson()
        {
            ChapterId = chapter.Id,
            Chapter = chapter,
            CreatedAt = DateTime.Now,
            UpdatedAt = DateTime.Now,
            Title = command.LessonPdfDto.Title,
            DocumentId = command.LessonPdfDto.DocumentPdfId,
            DocumentPdf = document
        };
        var lessonRepositoryResponse = await _lessonRepository.CreateLesson(lesson);
        document.LessonId = lessonRepositoryResponse.Id;
        await _documentRepository.UpdateDocumentAsync(document);
        return lessonRepositoryResponse;
    }
}