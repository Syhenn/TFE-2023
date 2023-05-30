using Application.Repositories;
using MediatR;

namespace Application.Context.Course;

public record GetCoursesCommand : IRequest<List<Entities.Course>>;

public class GetCoursesHandler : IRequestHandler<GetCoursesCommand, List<Entities.Course>>
{
    private readonly ICourseRepository _courseRepository;

    public GetCoursesHandler(ICourseRepository courseRepository)
    {
        _courseRepository = courseRepository;
    }

    public async Task<List<Entities.Course>> Handle(GetCoursesCommand command, CancellationToken cancellationToken)
    {
        return await _courseRepository.GetCoursesAsync();
    }

}