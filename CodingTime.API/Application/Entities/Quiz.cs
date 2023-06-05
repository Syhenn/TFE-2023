using System.Text.Json.Serialization;

namespace Application.Entities;

public class Quiz
{
    public int Id { get; set; }
    public string Name { get; set; }
    public string Title { get; set; }
    public string FakeAnswerOne { get; set; }
    public string FakeAnswerTwo { get; set; }
    public string CorrectAnswer{ get; set; }
}