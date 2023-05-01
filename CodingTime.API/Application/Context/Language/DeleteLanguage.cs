using MediatR;
using Application.Repositories;

namespace Application.Context.Language;

public record DeleteLanguageCommand(Entities.Language Language) : IRequest<Entities.Language>;

public class DeleteLanguageHandler : IRequestHandler<DeleteLanguageCommand, Entities.Language>
{
    private readonly ILanguageRepository _languageRepository;

    public DeleteLanguageHandler(ILanguageRepository languageRepository)
    {
        _languageRepository = languageRepository;
    }

    public async Task<Entities.Language> Handle(DeleteLanguageCommand command, CancellationToken cancellationToken)
    {
        var resultCreate = await _languageRepository.DeleteLanguageAsync(command.Language);
        return resultCreate;
    }
}