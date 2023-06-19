using Application.Repositories;
using MediatR;

namespace Application.Context.Course;

public record DeleteCourseCommand(int courseId) : IRequest<Entities.Course>;

public class DeleteCourseHandler : IRequestHandler<DeleteCourseCommand,Entities.Course>
{
    private readonly ICourseRepository _courseRepository;

    public DeleteCourseHandler(ICourseRepository courseRepository)
    {
        _courseRepository = courseRepository;
    }

    public async Task<Entities.Course> Handle(DeleteCourseCommand command, CancellationToken cancellationToken)
    {
        var course = await _courseRepository.GetCourseAsync(command.courseId);
        if (course == null)
        {
            return null;
        }
        return await _courseRepository.DeleteCourseAsync(course);
    }
}