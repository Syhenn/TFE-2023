using Application.Repositories;
using MediatR;

namespace Application.Context.User;

public record GetUserByMailCommand(string mail) : IRequest<Entities.User>;
public class GetUserByMailHandler : IRequestHandler<GetUserByMailCommand, Entities.User>
{
    private readonly IUserRepository _userRepository;

    public GetUserByMailHandler(IUserRepository userRepository)
    {
        _userRepository = userRepository;
    }

    public async Task<Entities.User> Handle(GetUserByMailCommand command, CancellationToken cancellationToken)
    {
        return await _userRepository.GetUserByMailAsync(command.mail);
    }
}