using Application.Repositories;
using Domain.Dtos;
using MediatR;
using System;
using System.Threading;
using System.Threading.Tasks;

namespace Application.Context.CorrectAnswer
{
    public record CreateCorrectAnswerCommand(CorrectAnswerDto CorrectAnswerDto) : IRequest<Entities.CorrectAnswer>;

    public class CreateCorrectAnswer : IRequestHandler<CreateCorrectAnswerCommand, Entities.CorrectAnswer>
    {
        private readonly ICorrectAnswerRepository _correctAnswerRepository;
        private readonly IQuizRepository _quizRepository;
        private readonly IUserRepository _userRepository;

        public CreateCorrectAnswer(ICorrectAnswerRepository correctAnswerRepository, IQuizRepository quizRepository, IUserRepository userRepository)
        {
            _correctAnswerRepository = correctAnswerRepository;
            _quizRepository = quizRepository;
            _userRepository = userRepository;
        }

        public async Task<Entities.CorrectAnswer> Handle(CreateCorrectAnswerCommand command, CancellationToken cancellationToken)
        {
            var quiz = await _quizRepository.GetQuiz(command.CorrectAnswerDto.QuizId);
            var user = await _userRepository.GetUserAsync(command.CorrectAnswerDto.UserId);

            var existingCorrectAnswer = await _correctAnswerRepository.GetCorrectAnswerByQuizAndUser(quiz.Id, user.Id);
            if (existingCorrectAnswer != null)
            {
                return existingCorrectAnswer;
            }

            var correctAnswer = new Entities.CorrectAnswer()
            {
                QuizId = quiz.Id,
                Quiz = quiz,
                UserId = user.Id,
                User = user,
                AnswerAt = DateTime.Now
            };

            var correctAnswerResponse = await _correctAnswerRepository.CreateCorrectAnswerAsync(correctAnswer);
            return correctAnswerResponse ?? null;
        }
    }
}
