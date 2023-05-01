using Application.Repositories;
using MediatR;

namespace Application.Context.User;
public record DeleteUserCommand(Entities.User User) : IRequest<Entities.User>;
public class DeleteUserHandler : IRequestHandler<DeleteUserCommand, Entities.User>
{
    private readonly IUserRepository _userRepository;


    public DeleteUserHandler(IUserRepository userRepositories)
    {
        _userRepository = userRepositories;
    }

    public async Task<Entities.User> Handle(DeleteUserCommand command, CancellationToken cancellationToken)
    {
        var resultCreate = await _userRepository.DeleteUserAsync(command.User);
        return resultCreate;
    }
}