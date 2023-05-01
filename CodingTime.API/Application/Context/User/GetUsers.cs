using Application.Repositories;
using MediatR;

namespace Application.Context.User;
public record GetUsersCommand : IRequest<List<Entities.User>>;
public class GetUsersHandler : IRequestHandler<GetUsersCommand, List<Entities.User>>
{
    private readonly IUserRepository _userRepository;


    public GetUsersHandler(IUserRepository userRepositories)
    {
        _userRepository = userRepositories;
    }

    public async Task<List<Entities.User>> Handle(GetUsersCommand command, CancellationToken cancellationToken)
    {
        var resultCreate = await _userRepository.GetUsersAsync();
        return resultCreate;
    }
}