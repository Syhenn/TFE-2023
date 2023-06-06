using Application.Repositories;
using MediatR;

namespace Application.Context.User;
public record DeleteUserCommand(string email) : IRequest<Entities.User>;
public class DeleteUserHandler : IRequestHandler<DeleteUserCommand, Entities.User>
{
    private readonly IUserRepository _userRepository;


    public DeleteUserHandler(IUserRepository userRepositories)
    {
        _userRepository = userRepositories;
    }

    public async Task<Entities.User> Handle(DeleteUserCommand command, CancellationToken cancellationToken)
    {
        var user = await _userRepository.GetUserByMailAsync(command.email);
        var resultCreate = await _userRepository.DeleteUserAsync(user);
        return resultCreate;
    }
}