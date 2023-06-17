using Domain.Enum;

namespace Domain.Dtos;

public record QuizDto(int? Id, string Name, string Title,string FalseAnswerOne, string FalseAnswerTwo ,string CorrectAnswer, int CourseId);