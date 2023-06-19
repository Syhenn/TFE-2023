using Application.Repositories;
using MediatR;

namespace Application.Context.Course;

public record GetCourseByLanguageCommand(int languageId) : IRequest<List<Entities.Course>>;

public class GetCourseByLanguageHandler : IRequestHandler<GetCourseByLanguageCommand,List<Entities.Course>>
{
    private readonly ICourseRepository _CourseRepository;

    public GetCourseByLanguageHandler(ICourseRepository courseRepository)
    {
        _CourseRepository = courseRepository;
    }

    public async Task<List<Entities.Course>> Handle(GetCourseByLanguageCommand command, CancellationToken cancellationToken)
    {
        return await _CourseRepository.GetCourseByLanguage(command.languageId);
    }
}