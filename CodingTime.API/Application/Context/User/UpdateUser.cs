using Application.Repositories;
using Domain.Dtos;
using MediatR;

namespace Application.Context.User
{
    public record UpdateUserCommand(UserDto UserDto) : IRequest<Entities.User>;

    public class UpdateUserHandler : IRequestHandler<UpdateUserCommand, Entities.User>
    {
        private readonly IUserRepository _userRepository;

        public UpdateUserHandler(IUserRepository userRepository)
        {
            _userRepository = userRepository;
        }

        public async Task<Entities.User> Handle(UpdateUserCommand command, CancellationToken cancellationToken)
        {
            var userByMail = await _userRepository.GetUserByMailAsync(command.UserDto.Email);
            var user = new Entities.User()
            {
                Id = userByMail.Id,
                Age = command.UserDto.Age,
                CreatedAt = userByMail.CreatedAt,
                UpdateAt = DateTime.Now,
                DisplayName = command.UserDto.DisplayName,
                Email = command.UserDto.Email,
                Level = 0,
                Password = userByMail.Password,
                Name = command.UserDto.Name,
                Surname = command.UserDto.Surname,
                UserRole = userByMail.UserRole
            };

            var resultCreate = await _userRepository.UpdateUserAsync(user);
            return resultCreate;
        }
    }
}