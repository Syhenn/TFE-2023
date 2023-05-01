
using Application.Repositories;
using MediatR;

namespace Application.Context.User;
public record GetUserByIdCommand(int userId) : IRequest<Entities.User>;
public class GetUserByIdHandler : IRequestHandler<GetUserByIdCommand, Entities.User>
{
    private readonly IUserRepository _userRepository;


    public GetUserByIdHandler(IUserRepository userRepositories)
    {
        _userRepository = userRepositories;
    }

    public async Task<Entities.User> Handle(GetUserByIdCommand command, CancellationToken cancellationToken)
    {
        var resultCreate = await _userRepository.GetUserAsync(command.userId);
        return resultCreate;
    }
}
