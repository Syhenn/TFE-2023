using NUnit.Framework;
using Application.Entities;
using Bogus;
using System;

namespace CorrectAnswerTest
{
    [TestFixture]
    public class Tests
    {
        private CorrectAnswer _correctAnswer;
        private Random _random;

        [SetUp]
        public void Setup()
        {
            _random = new Random();
            var faker = new Faker();

            _correctAnswer = new CorrectAnswer
            {
                CorrectAnswerId = _random.Next(),
                QuizId = _random.Next(),
                UserId = _random.Next(),
                AnswerAt = DateTime.Now.AddDays(-_random.Next(1, 365))
            };
        }

        [Test]
        public void CorrectAnswerIdIsCorrect()
        {
            Assert.AreEqual(_correctAnswer.CorrectAnswerId, _correctAnswer.CorrectAnswerId);
        }

        [Test]
        public void CorrectAnswerQuizIdIsPositive()
        {
            Assert.IsTrue(_correctAnswer.QuizId > 0);
        }

        [Test]
        public void CorrectAnswerUserIdIsPositive()
        {
            Assert.IsTrue(_correctAnswer.UserId > 0);
        }

        [Test]
        public void CorrectAnswerAnswerAtIsInThePast()
        {
            Assert.IsTrue(_correctAnswer.AnswerAt < DateTime.Now);
        }

        // [Test]
        // public void CorrectAnswerUserIsNotNull()
        // {
        //     Assert.IsNotNull(_correctAnswer.User);
        // }

        // [Test]
        // public void CorrectAnswerQuizIsNotNull()
        // {
        //     Assert.IsNotNull(_correctAnswer.Quiz);
        // }
    }
}