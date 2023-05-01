using Application.Repositories;
using MediatR;

namespace Application.Context.User;
public record CreateUserCommand(Entities.User User) : IRequest<Entities.User>;
public class CreateUserHandler : IRequestHandler<CreateUserCommand, Entities.User>
{
    private readonly IUserRepository _userRepository;


    public CreateUserHandler(IUserRepository userRepositories)
    {
        _userRepository = userRepositories;
    }

    public async Task<Entities.User> Handle(CreateUserCommand command, CancellationToken cancellationToken)
    {
        var resultCreate = await _userRepository.CreateUserAsync(command.User);
        return resultCreate;
    }
}