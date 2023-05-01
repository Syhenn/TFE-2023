using MediatR;
using Application.Repositories;

namespace Application.Context.Language;

public record GetLanguageCommand: IRequest<List<Entities.Language>>;

public class GetLanguageHandler : IRequestHandler<GetLanguageCommand, List<Entities.Language>>
{
    private readonly ILanguageRepository _languageRepository;

    public GetLanguageHandler(ILanguageRepository languageRepository)
    {
        _languageRepository = languageRepository;
    }

    public async Task<List<Entities.Language>> Handle(GetLanguageCommand command, CancellationToken cancellationToken)
    {
        var resultCreate = await _languageRepository.GetLanguagesAsync();
        return resultCreate;
    }
}