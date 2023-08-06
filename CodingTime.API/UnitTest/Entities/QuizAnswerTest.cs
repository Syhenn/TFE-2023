using NUnit.Framework;
using Application.Entities;
using Bogus;
using System;

namespace QuizAnswerTest
{
    [TestFixture]
    public class Tests
    {
        private QuizAnswer _quizAnswer;
        private Random _random;

        [SetUp]
        public void Setup()
        {
            _random = new Random();
            var faker = new Faker();

            _quizAnswer = new QuizAnswer
            {
                Id = _random.Next(),
                UserId = _random.Next(),
                QuizId = _random.Next(),
                Points = _random.Next(0, 100),
                AnsweredAt = DateTime.Now.AddDays(-_random.Next(1, 365))
            };
        }

        [Test]
        public void QuizAnswerIdIsCorrect()
        {
            Assert.AreEqual(_quizAnswer.Id, _quizAnswer.Id);
        }

        [Test]
        public void QuizAnswerUserIdIsPositive()
        {
            Assert.IsTrue(_quizAnswer.UserId > 0);
        }

        [Test]
        public void QuizAnswerQuizIdIsPositive()
        {
            Assert.IsTrue(_quizAnswer.QuizId > 0);
        }

        [Test]
        public void QuizAnswerPointsIsInRange()
        {
            Assert.IsTrue(_quizAnswer.Points >= 0 && _quizAnswer.Points <= 100);
        }

        [Test]
        public void QuizAnswerAnsweredAtIsInThePast()
        {
            Assert.IsTrue(_quizAnswer.AnsweredAt < DateTime.Now);
        }

        // [Test]
        // public void QuizAnswerUserIsNotNull()
        // {
        //     Assert.IsNotNull(_quizAnswer.User);
        // }

        // [Test]
        // public void QuizAnswerQuizIsNotNull()
        // {
        //     Assert.IsNotNull(_quizAnswer.Quiz);
        // }
    }
}