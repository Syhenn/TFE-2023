using MediatR;
using Application.Repositories;

namespace Application.Context.Language;

public record CreateLanguageCommand(Entities.Language Language) : IRequest<Entities.Language>;

public class CreateLanguageHandler : IRequestHandler<CreateLanguageCommand, Entities.Language>
{
    private readonly ILanguageRepositories _languageRepositories;

    public CreateLanguageHandler(ILanguageRepositories languageRepositories)
    {
        _languageRepositories = languageRepositories;
    }

    public async Task<Entities.Language> Handle(CreateLanguageCommand command, CancellationToken cancellationToken)
    {
        var resultCreate = await _languageRepositories.CreateLanguageAsync(command.Language);
        return resultCreate;
    }
}