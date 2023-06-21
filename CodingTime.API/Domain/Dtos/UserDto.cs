using Domain.Enum;

namespace Domain.Dtos;

public record UserDto(
    string Name,
    string Surname,
    string DisplayName,
    string Email, 
    string? Password,
    int Age,
    UserRole? UserRole);