using Application.Repositories;
using MediatR;

namespace Application.Context.Chapter;

public record GetChapterByNameCommand(string chapterName) : IRequest<Entities.Chapter>;

public class GetChapterByNameHandler : IRequestHandler<GetChapterByNameCommand, Entities.Chapter>
{
    private readonly IChapterRepository _chapterRepository;

    public GetChapterByNameHandler(IChapterRepository chapterRepository)
    {
        _chapterRepository = chapterRepository;
    }

    public async Task<Entities.Chapter> Handle(GetChapterByNameCommand command, CancellationToken cancellationToken)
    {
        return await _chapterRepository.GetChapterByName(command.chapterName);
    }
}