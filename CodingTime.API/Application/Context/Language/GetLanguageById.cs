using MediatR;
using Application.Repositories;

namespace Application.Context.Language;

public record GetLanguageByIdCommand(int languageId) : IRequest<Entities.Language>;

public class GetLanguageByIdHandler : IRequestHandler<GetLanguageByIdCommand, Entities.Language>
{
    private readonly ILanguageRepository _languageRepository;

    public GetLanguageByIdHandler(ILanguageRepository languageRepository)
    {
        _languageRepository = languageRepository;
    }

    public async Task<Entities.Language> Handle(GetLanguageByIdCommand command, CancellationToken cancellationToken)
    {
        var resultCreate = await _languageRepository.GetLanguageAsync(command.languageId);
        return resultCreate;
    }
}