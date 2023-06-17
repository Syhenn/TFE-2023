using Application.Repositories;
using MediatR;

namespace Application.Context.User;

public record VerifyUserCommand(int userId) : IRequest<Entities.User>;
public class VerifyUserHandler : IRequestHandler<VerifyUserCommand, Entities.User>
{
    private readonly IUserRepository _userRepository;

    public VerifyUserHandler(IUserRepository userRepository)
    {
        _userRepository = userRepository;
    }

    public async Task<Entities.User> Handle(VerifyUserCommand command, CancellationToken cancellationToken)
    {
        var user = await _userRepository.GetUserAsync(command.userId);
        if (user == null)
        {
            return null;
        }
        user.IsVerify = true;
        return await _userRepository.UpdateUserAsync(user);
    }
}