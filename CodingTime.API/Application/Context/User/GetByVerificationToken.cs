using Application.Repositories;
using MediatR;

namespace Application.Context.User;

public record GetByVerificationTokenCommand(string verificationToken) : IRequest<Entities.User>;
public class GetByVerificationTokenHandler : IRequestHandler<GetByVerificationTokenCommand, Entities.User>
{
    private readonly IUserRepository _userRepository;

    public GetByVerificationTokenHandler(IUserRepository userRepository)
    {
        _userRepository = userRepository;
    }

    public async Task<Entities.User> Handle(GetByVerificationTokenCommand command, CancellationToken cancellationToken)
    {
        var user = await _userRepository.GetUserByVerificationToken(command.verificationToken);
        return user ?? null;
    }
}