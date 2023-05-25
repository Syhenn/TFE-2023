using Application.Repositories;
using MediatR;

namespace Application.Context.Chapter;

public record GetChapterByIdCommand(int chapterId) : IRequest<Entities.Chapter>;
public class GetChapterByIdHandler : IRequestHandler<GetChapterByIdCommand, Entities.Chapter>
{
    private readonly IChapterRepository _chapterRepository;

    public GetChapterByIdHandler(IChapterRepository chapterRepository)
    {
        _chapterRepository = chapterRepository;
    }

    public async Task<Entities.Chapter> Handle(GetChapterByIdCommand command,
        CancellationToken cancellationToken)
    {
        var chapter = await _chapterRepository.GetChapterAsync(command.chapterId);
        return chapter;
    }
}