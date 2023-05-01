using MediatR;
using Application.Repositories;

namespace Application.Context.Language;

public record DeleteLanguageCommand(Entities.Language Language) : IRequest<Entities.Language>;

public class DeleteLanguageHandler : IRequestHandler<DeleteLanguageCommand, Entities.Language>
{
    private readonly ILanguageRepositories _languageRepositories;

    public DeleteLanguageHandler(ILanguageRepositories languageRepositories)
    {
        _languageRepositories = languageRepositories;
    }

    public async Task<Entities.Language> Handle(DeleteLanguageCommand command, CancellationToken cancellationToken)
    {
        var resultCreate = await _languageRepositories.DeleteLanguageAsync(command.Language);
        return resultCreate;
    }
}