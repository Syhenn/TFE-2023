using Application.Repositories;
using MediatR;

namespace Application.Context.Course;

public record GetCourseIncludedCommand(int courseId) : IRequest<Entities.Course>;
public class GetCourseIncludedHandler : IRequestHandler<GetCourseIncludedCommand, Entities.Course>
{
    private readonly ICourseRepository _courseRepository;

    public GetCourseIncludedHandler(ICourseRepository courseRepository)
    {
        _courseRepository = courseRepository;
    }

    public async Task<Entities.Course> Handle(GetCourseIncludedCommand command, CancellationToken cancellationToken)
    {
        return await _courseRepository.GetCourseIncluded(command.courseId);
    }
}