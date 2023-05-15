using Application.Repositories;
using MediatR;

namespace Application.Context.Language;

public record GetLanguageByNameCommand(string name) : IRequest<Entities.Language>;
public class GetLanguageByNameHandler : IRequestHandler<GetLanguageByNameCommand, Entities.Language>
{
    private readonly ILanguageRepository _languageRepository;

    public GetLanguageByNameHandler(ILanguageRepository languageRepository)
    {
        _languageRepository = languageRepository;
    }

    public async Task<Entities.Language> Handle(GetLanguageByNameCommand command,
        CancellationToken cancellationToken)
    {
        var userLanguage = await _languageRepository.GetLanguageByNameAsync(command.name);
        return userLanguage;
    }
}