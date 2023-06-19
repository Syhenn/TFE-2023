using Application.Repositories;
using MediatR;

namespace Application.Context.Course;

public record VerifyCourseCommand(int courseId): IRequest<Entities.Course>;
public class VerifyCourseHandle : IRequestHandler<VerifyCourseCommand, Entities.Course>
{
    private readonly ICourseRepository _courseRepository;

    public VerifyCourseHandle(ICourseRepository courseRepository)
    {
        _courseRepository = courseRepository;
    }

    public async Task<Entities.Course> Handle(VerifyCourseCommand command, CancellationToken cancellationToken)
    {
        var course = await _courseRepository.GetCourseAsync(command.courseId);
        course.IsVerify = true;
        return await _courseRepository.UpdateCourse(course);
    }
}