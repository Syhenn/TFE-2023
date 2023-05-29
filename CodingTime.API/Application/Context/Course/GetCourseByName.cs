using Application.Repositories;
using MediatR;

namespace Application.Context.Course;

public record GetCourseByNameCommand(string courseName) : IRequest<Entities.Course>;

public class GetCourseByNameHandler : IRequestHandler<GetCourseByNameCommand, Entities.Course>
{
    private readonly ICourseRepository _courseRepository;

    public GetCourseByNameHandler(ICourseRepository courseRepository)
    {
        _courseRepository = courseRepository;
    }

    public async Task<Entities.Course> Handle(GetCourseByNameCommand command, CancellationToken cancellationToken)
    {
        return await _courseRepository.GetCourseByName(command.courseName);
    }

}