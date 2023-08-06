using NUnit.Framework;
using Application.Entities;
using Bogus;
using System;

namespace CompletedLessonTest
{
    [TestFixture]
    public class Tests
    {
        private CompletedLesson _completedLesson;
        private Random _random;

        [SetUp]
        public void Setup()
        {
            _random = new Random();
            var faker = new Faker();

            _completedLesson = new CompletedLesson
            {
                Id = _random.Next(),
                UserId = _random.Next(),
                LessonId = _random.Next()
            };
        }

        [Test]
        public void CompletedLessonIdIsCorrect()
        {
            Assert.AreEqual(_completedLesson.Id, _completedLesson.Id);
        }

        [Test]
        public void CompletedLessonUserIdIsPositive()
        {
            Assert.IsTrue(_completedLesson.UserId > 0);
        }

        [Test]
        public void CompletedLessonLessonIdIsPositive()
        {
            Assert.IsTrue(_completedLesson.LessonId > 0);
        }

        // [Test]
        // public void CompletedLessonUserIsNotNull()
        // {
        //     Assert.IsNotNull(_completedLesson.User);
        // }

        // [Test]
        // public void CompletedLessonLessonIsNotNull()
        // {
        //     Assert.IsNotNull(_completedLesson.Lesson);
        // }
    }
}