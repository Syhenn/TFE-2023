using Application.Context.Chapter;
using Application.Repositories;
using Domain.Dtos;
using MediatR;

namespace Application.Context.Course;

public record CreateCourseCommand(CourseDto CourseDto) : IRequest<Entities.Course>;
public class CreateCourseHandler : IRequestHandler<CreateCourseCommand, Entities.Course>
{
    private readonly ICourseRepository _courseRepository;
    private readonly ILanguageRepository _languageRepository;

    public CreateCourseHandler(ICourseRepository courseRepository, ILanguageRepository languageRepository)
    {
        _courseRepository = courseRepository;
        _languageRepository = languageRepository;
    }

    public async Task<Entities.Course> Handle(CreateCourseCommand command, CancellationToken cancellationToken)
    {
        var language = await _languageRepository.GetLanguageAsync(command.CourseDto.LanguageId);
        var course = new Entities.Course()
        {
            Title = command.CourseDto.Title,
            Description = command.CourseDto.Description,
            LanguageId = command.CourseDto.LanguageId,
            CreatedBy = command.CourseDto.CreatedBy,
            IsVerify = false,
            Language = language
        };
        var result = await _courseRepository.CreateCourseAsync(course);
        return result;
    }
}