using Application.Repositories;
using MediatR;

namespace Application.Context.Chapter;

public record DeleteChapterCommand(int chapterId) : IRequest<Entities.Chapter>;
public class DeleteChapterHandler : IRequestHandler<DeleteChapterCommand, Entities.Chapter>
{
    private readonly IChapterRepository _chapterRepository;

    public DeleteChapterHandler(IChapterRepository chapterRepository)
    {
        _chapterRepository = chapterRepository;
    }

    public async Task<Entities.Chapter> Handle(DeleteChapterCommand command, CancellationToken cancellationToken)
    {
        var chapter = await _chapterRepository.GetChapterAsync(command.chapterId);
        if (chapter == null)
        {
            return null;
        }
        return await _chapterRepository.DeleteChapter(chapter);
    }
}