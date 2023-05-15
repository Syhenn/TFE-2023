using Application.Repositories;
using MediatR;

namespace Application.Context.Chapter;

public record GetChapterByCourseCommand(int courseId) : IRequest<List<Entities.Chapter>>;
public class GetChapterByCourseHandler : IRequestHandler<GetChapterByCourseCommand, List<Entities.Chapter>>
{
    private readonly IChapterRepository _chapterRepository;

    public GetChapterByCourseHandler(IChapterRepository chapterRepository)
    {
        _chapterRepository = chapterRepository;
    }

    public async Task<List<Entities.Chapter>> Handle(GetChapterByCourseCommand command,
        CancellationToken cancellationToken)
    {
        var chapters = await _chapterRepository.GetChapterByCourse(command.courseId);
        return chapters;
    }
}