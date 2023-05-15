using Application.Repositories;
using Domain.Dtos;
using FluentValidation;
using MediatR;
using OneOf;

namespace Application.Context.User;

public record UserDataValidationCommand(UserDto UserDto) : IRequest<OneOf<bool, ValidationException>>;

public class UserDataValidationHandler : IRequestHandler<UserDataValidationCommand, OneOf<bool, ValidationException>>
{
    private readonly IUserRepository _userRepository;

    public UserDataValidationHandler(IUserRepository userRepository)
    {
        _userRepository = userRepository;
    }

    public async Task<OneOf<bool, ValidationException>> Handle(UserDataValidationCommand command,
        CancellationToken cancellationToken)
    {
        var validator = new UserDataValidator(_userRepository);
        var validationResult = await validator.ValidateAsync(command.UserDto, cancellationToken);
        if (validationResult.IsValid)
            return true;
        return new ValidationException(validationResult.Errors);
    }
}

public class UserDataValidator : AbstractValidator<UserDto>
{
    private readonly IUserRepository _userRepository;

    public UserDataValidator(IUserRepository userRepository)
    {
        _userRepository = userRepository;

        RuleFor(x => x.Email)
            .MustAsync(BeUniqueEmail).WithMessage("Cette email est déjà associé à un compte.");
        RuleFor(x => x.DisplayName)
            .MustAsync(BeUniqueDisplayName).WithMessage("Ce pseudo est déjà utilisé.");
    }

    private async Task<bool> BeUniqueEmail(string email, CancellationToken cancellationToken)
    {
        var user = await _userRepository.GetUserByMailAsync(email);
        return user == null;
    }

    private async Task<bool> BeUniqueDisplayName(string displayName, CancellationToken cancellationToken)
    {
        var user = await _userRepository.GetUserByDisplayNameAsync(displayName);
        return user == null;
    }
}