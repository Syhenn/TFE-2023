using MediatR;
using Application.Repositories;

namespace Application.Context.Language;

public record GetLanguageByIdCommand(int languageId) : IRequest<Entities.Language>;

public class GetLanguageByIdHandler : IRequestHandler<GetLanguageByIdCommand, Entities.Language>
{
    private readonly ILanguageRepositories _languageRepositories;

    public GetLanguageByIdHandler(ILanguageRepositories languageRepositories)
    {
        _languageRepositories = languageRepositories;
    }

    public async Task<Entities.Language> Handle(GetLanguageByIdCommand command, CancellationToken cancellationToken)
    {
        var resultCreate = await _languageRepositories.GetLanguageAsync(command.languageId);
        return resultCreate;
    }
}