using Application.Repositories;
using MediatR;

namespace Application.Context.User;

public record GetUserLanguageCommand(int userId) : IRequest<List<Entities.Language>>;

public class GetUserLanguageHandler : IRequestHandler<GetUserLanguageCommand, List<Entities.Language>>
{
    private readonly IUserRepository _userRepository;

    public GetUserLanguageHandler(IUserRepository userRepository)
    {
        _userRepository = userRepository;
    }

    public async Task<List<Entities.Language>> Handle(GetUserLanguageCommand command,
        CancellationToken cancellationToken)
    {
        var languages = await _userRepository.GetUserLanguagesAsync(command.userId);
        return languages;
    }
}