using Application.Repositories;
using Domain.Dtos;
using MediatR;

namespace Application.Context.Chapter;

public record CreateChapterCommand(ChapterDto ChapterDto) : IRequest<Entities.Chapter>;

public class CreateChapterHandler : IRequestHandler<CreateChapterCommand, Entities.Chapter>
{
    private readonly IChapterRepository _chapterRepository;
    private readonly ICourseRepository _courseRepository;

    public CreateChapterHandler(IChapterRepository chapterRepository, ICourseRepository courseRepository)
    {
        _chapterRepository = chapterRepository;
        _courseRepository = courseRepository;
    }

    public async Task<Entities.Chapter> Handle(CreateChapterCommand command, CancellationToken cancellationToken)
    {
        var course = await _courseRepository.GetCourseAsync(command.ChapterDto.CourseId);
        var chapter = new Entities.Chapter()
        {
            Title = command.ChapterDto.Title,
            CourseId = command.ChapterDto.CourseId,
            Course = course
        };
        var result = await _chapterRepository.CreateChapter(chapter);
        return result;
    }
}