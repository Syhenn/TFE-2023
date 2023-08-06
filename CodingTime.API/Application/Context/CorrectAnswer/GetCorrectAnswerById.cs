using Application.Repositories;
using MediatR;

namespace Application.Context.CorrectAnswer;

public record GetCorrectAnswerByIdCommand(int correctAnswerId) : IRequest<Entities.CorrectAnswer>;
public class GetCorrectAnswerByIdHandler : IRequestHandler<GetCorrectAnswerByIdCommand, Entities.CorrectAnswer>
{
    private readonly ICorrectAnswerRepository _correctAnswerRepository;

    public GetCorrectAnswerByIdHandler(ICorrectAnswerRepository correctAnswerRepository)
    {
        _correctAnswerRepository = correctAnswerRepository;
    }

    public async Task<Entities.CorrectAnswer> Handle(GetCorrectAnswerByIdCommand command,
        CancellationToken cancellationToken)
    {
        var correctAnswerResult = await _correctAnswerRepository.GetCorrectAnswerByIdAsync(command.correctAnswerId);
        return correctAnswerResult ?? null;
    }
}