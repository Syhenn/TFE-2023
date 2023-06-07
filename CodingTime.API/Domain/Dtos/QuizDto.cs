using Domain.Enum;

namespace Domain.Dtos;

public record QuizDto(string Name, string Title,string FalseAnswerOne, string FalseAnswerTwo ,string CorrectAnswer, int CourseId);