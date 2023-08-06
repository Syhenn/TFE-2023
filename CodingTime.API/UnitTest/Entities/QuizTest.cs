using NUnit.Framework;
using Application.Entities;
using Bogus;
using System;
using System.Linq;
using System.Collections.Generic;

namespace QuizTest
{
    [TestFixture]
    public class Tests
    {
        private Quiz _quiz;
        private Random _random;

        [SetUp]
        public void Setup()
        {
            _random = new Random();
            var faker = new Faker();

            _quiz = new Quiz
            {
                Id = _random.Next(),
                Name = GenerateRandomString(),
                Title = GenerateRandomString(),
                FakeAnswerOne = GenerateRandomString(),
                FakeAnswerTwo = GenerateRandomString(),
                CorrectAnswer = GenerateRandomString(),
                CourseId = _random.Next()
            };
        }

        private string GenerateRandomString()
        {
            const string chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
            return new string(Enumerable.Repeat(chars, 10)
                .Select(s => s[_random.Next(s.Length)]).ToArray());
        }

        [Test]
        public void QuizIdIsCorrect()
        {
            Assert.AreEqual(_quiz.Id, _quiz.Id);
        }

        [Test]
        public void QuizNameIsNotEmpty()
        {
            Assert.IsFalse(string.IsNullOrEmpty(_quiz.Name));
        }

        [Test]
        public void QuizTitleIsNotEmpty()
        {
            Assert.IsFalse(string.IsNullOrEmpty(_quiz.Title));
        }

        [Test]
        public void QuizFakeAnswerOneIsNotEmpty()
        {
            Assert.IsFalse(string.IsNullOrEmpty(_quiz.FakeAnswerOne));
        }

        [Test]
        public void QuizFakeAnswerTwoIsNotEmpty()
        {
            Assert.IsFalse(string.IsNullOrEmpty(_quiz.FakeAnswerTwo));
        }

        [Test]
        public void QuizCorrectAnswerIsNotEmpty()
        {
            Assert.IsFalse(string.IsNullOrEmpty(_quiz.CorrectAnswer));
        }

        [Test]
        public void QuizCourseIdIsPositive()
        {
            Assert.IsTrue(_quiz.CourseId > 0);
        }

        // [Test]
        // public void QuizCourseIsNotNull()
        // {
        //     Assert.IsNotNull(_quiz.Course);
        // }

        // [Test]
        // public void QuizQuizAnswersIsNotNull()
        // {
        //     Assert.IsNotNull(_quiz.QuizAnswers);
        // }

        // [Test]
        // public void QuizCorrectAnswersIsNotNull()
        // {
        //     Assert.IsNotNull(_quiz.CorrectAnswers);
        // }
    }
}
