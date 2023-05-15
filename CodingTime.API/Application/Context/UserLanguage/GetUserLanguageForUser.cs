using Application.Repositories;
using MediatR;

namespace Application.Context.UserLanguage;

public record GetUserLanguageForUserCommand(int userId) : IRequest<List<Entities.UserLanguage>>;
public class GetUserLanguageForUserHandler : IRequestHandler<GetUserLanguageForUserCommand, List<Entities.UserLanguage>>
{
    private readonly IUserLanguageRepository _languageRepository;

    public GetUserLanguageForUserHandler(IUserLanguageRepository languageRepository)
    {
        _languageRepository = languageRepository;
    }

    public async Task<List<Entities.UserLanguage>> Handle(GetUserLanguageForUserCommand command,
        CancellationToken cancellationToken)
    {
        var result = await _languageRepository.GetLanguagesForUser(command.userId);
        return result;
    }
}