using Application.Repositories;
using Domain.Dtos;
using MediatR;

namespace Application.Context.User;

public record LoginUserCommand(string email, string password) : IRequest<Entities.User>;

public class LoginUserHandler : IRequestHandler<LoginUserCommand, Entities.User>
{
    private readonly IUserRepository _userRepository;

    public LoginUserHandler(IUserRepository userRepository)
    {
        _userRepository = userRepository;
    }

    public async Task<Entities.User> Handle(LoginUserCommand command, CancellationToken cancellationToken)
    {
        var userByMail = await _userRepository.GetUserByMailAsync(command.email);
        if (userByMail == null)
            return null;
        return command.password != userByMail.Password ? null : userByMail;
    }
}