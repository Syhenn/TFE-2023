using MediatR;
using Application.Repositories;

namespace Application.Context.Language;

public record GetLanguageCommand: IRequest<List<Entities.Language>>;

public class GetLanguageHandler : IRequestHandler<GetLanguageCommand, List<Entities.Language>>
{
    private readonly ILanguageRepositories _languageRepositories;

    public GetLanguageHandler(ILanguageRepositories languageRepositories)
    {
        _languageRepositories = languageRepositories;
    }

    public async Task<List<Entities.Language>> Handle(GetLanguageCommand command, CancellationToken cancellationToken)
    {
        var resultCreate = await _languageRepositories.GetLanguagesAsync();
        return resultCreate;
    }
}