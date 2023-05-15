using Application.Repositories;
using Domain.Dtos;
using MediatR;

namespace Application.Context.UserLanguage;

public record AddUserLanguageCommand(UserLanguageDto userLanguageDto) : IRequest<Entities.UserLanguage>;

public class AddUserLanguageHandler : IRequestHandler<AddUserLanguageCommand, Entities.UserLanguage>
{
    private readonly IUserLanguageRepository _userLanguageRepository;
    private readonly IUserRepository _userRepository;
    private readonly ILanguageRepository _languageRepository;

    public AddUserLanguageHandler(IUserLanguageRepository userLanguageRepository, IUserRepository userRepository, ILanguageRepository languageRepository)
    {
        _userRepository = userRepository;
        _languageRepository = languageRepository;
        _userLanguageRepository = userLanguageRepository;
    }

    public async Task<Entities.UserLanguage> Handle(AddUserLanguageCommand command, CancellationToken cancellationToken)
    {
        var user = await _userRepository.GetUserAsync(command.userLanguageDto.UserId);
        var language = await _languageRepository.GetLanguageAsync(command.userLanguageDto.LanguageId);
        var userLanguage = new Entities.UserLanguage()
        {
            Language = language,
            LanguageId = language.Id,
            User = user,
            UserId = user.Id
        };
        var userLanguageResult = await _userLanguageRepository.CreateUserLanguageAsync(userLanguage);
        return userLanguageResult;

    }
}