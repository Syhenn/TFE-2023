using Application.Repositories;
using Domain.Dtos;
using MediatR;
using Domain.Enum;

namespace Application.Context.User
{
    public record CreateUserCommand(UserDto UserDto) : IRequest<Entities.User>;

    public class CreateUserHandler : IRequestHandler<CreateUserCommand, Entities.User>
    {
        private readonly IUserRepository _userRepository;

        public CreateUserHandler(IUserRepository userRepository)
        {
            _userRepository = userRepository;
        }

        public async Task<Entities.User> Handle(CreateUserCommand command, CancellationToken cancellationToken)
        {
            var user = new Entities.User()
            {
                Age = command.UserDto.Age,
                CreatedAt = DateTime.Now,
                UpdateAt = DateTime.Now,
                DisplayName = command.UserDto.DisplayName,
                Email = command.UserDto.Email,
                Id = 0,
                Level = 0,
                IsVerify = false,
                Password = BCrypt.Net.BCrypt.HashPassword(command.UserDto.Password),
                Name = command.UserDto.Name,
                Surname = command.UserDto.Surname,
                UserRole = command.UserDto.UserRole
            };
            if (user.UserRole == UserRole.Student)
            {
                user.IsVerify = true;
            }
            var resultCreate = await _userRepository.CreateUserAsync(user);
            return resultCreate;
        }
    }
}