using Application.Repositories;
using MediatR;

namespace Application.Context.Lesson;
public record GetLessonByChapterCommand(int chapterId) : IRequest<List<Entities.Lesson>>;
public class GetLessonByChapterHandler : IRequestHandler<GetLessonByChapterCommand, List<Entities.Lesson>>
{
    private readonly ILessonRepository _lessonRepository;

    public GetLessonByChapterHandler(ILessonRepository lessonRepository)
    {
        _lessonRepository = lessonRepository;
    }

    public async Task<List<Entities.Lesson>> Handle(GetLessonByChapterCommand command, CancellationToken cancellationToken)
    {
        var requestResult = await _lessonRepository.GetLessonByChapter(command.chapterId);
        return requestResult;
    }
}