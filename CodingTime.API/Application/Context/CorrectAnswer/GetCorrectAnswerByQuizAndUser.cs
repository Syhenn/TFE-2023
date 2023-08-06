using Application.Repositories;
using Domain.Dtos;
using MediatR;

namespace Application.Context.CorrectAnswer;

public record GetCorrectAnswerByQuizAndUserCommand(CorrectAnswerDto correctAnswerDto) : IRequest<Entities.CorrectAnswer>;

public class
    GetCorrectAnswerByQuizAndUserHandler : IRequestHandler<GetCorrectAnswerByQuizAndUserCommand, Entities.CorrectAnswer>
{
    private readonly ICorrectAnswerRepository _repository;

    public GetCorrectAnswerByQuizAndUserHandler(ICorrectAnswerRepository repository)
    {
        _repository = repository;
    }

    public async Task<Entities.CorrectAnswer> Handle(GetCorrectAnswerByQuizAndUserCommand command,
        CancellationToken cancellationToken)
    {
        var correctAnswerResponse =
            await _repository.GetCorrectAnswerByQuizAndUser(command.correctAnswerDto.QuizId,
                command.correctAnswerDto.UserId);
        return correctAnswerResponse ?? null;
    }
}