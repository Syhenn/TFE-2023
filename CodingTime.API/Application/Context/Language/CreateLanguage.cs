using MediatR;
using Application.Repositories;

namespace Application.Context.Language;

public record CreateLanguageCommand(Entities.Language Language) : IRequest<Entities.Language>;

public class CreateLanguageHandler : IRequestHandler<CreateLanguageCommand, Entities.Language>
{
    private readonly ILanguageRepository _languageRepository;

    public CreateLanguageHandler(ILanguageRepository languageRepository)
    {
        _languageRepository = languageRepository;
    }

    public async Task<Entities.Language> Handle(CreateLanguageCommand command, CancellationToken cancellationToken)
    {
        var resultCreate = await _languageRepository.CreateLanguageAsync(command.Language);
        return resultCreate;
    }
}