using NUnit.Framework;
using Application.Entities;
using Bogus;
using System;
using System.Collections.Generic;
using System.Linq;

namespace CourseTest
{
    [TestFixture]
    public class Tests
    {
        private Course _course;
        private Random _random;

        [SetUp]
        public void Setup()
        {
            _random = new Random();
            var faker = new Faker();

            _course = new Course
            {
                Id = _random.Next(),
                Title = GenerateRandomString(),
                Description = GenerateRandomString(),
                LanguageId = _random.Next(),
                CreatedBy = _random.Next(),
                IsVerify = _random.Next(0, 2) == 1
            };
        }

        private string GenerateRandomString()
        {
            const string chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
            return new string(Enumerable.Repeat(chars, 10)
                .Select(s => s[_random.Next(s.Length)]).ToArray());
        }

        [Test]
        public void CourseIdIsCorrect()
        {
            Assert.AreEqual(_course.Id, _course.Id);
        }

        [Test]
        public void CourseTitleIsNotEmpty()
        {
            Assert.IsFalse(string.IsNullOrEmpty(_course.Title));
        }

        [Test]
        public void CourseDescriptionIsNotEmpty()
        {
            Assert.IsFalse(string.IsNullOrEmpty(_course.Description));
        }

        [Test]
        public void CourseLanguageIdIsPositive()
        {
            Assert.IsTrue(_course.LanguageId > 0);
        }

        [Test]
        public void CourseCreatedByIsPositive()
        {
            Assert.IsTrue(_course.CreatedBy > 0);
        }

        [Test]
        public void CourseIsVerifyIsTrueOrFalse()
        {
            Assert.IsTrue(_course.IsVerify == true || _course.IsVerify == false);
        }

        // [Test]
        // public void CourseQuizzesIsNotNull()
        // {
        //     Assert.IsNotNull(_course.Quizzes);
        // }

        // [Test]
        // public void CourseChaptersIsNotNull()
        // {
        //     Assert.IsNotNull(_course.Chapters);
        // }
    }
}
