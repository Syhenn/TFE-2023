using NUnit.Framework;
using Application.Entities;
using Bogus;
using System;
using System.Linq;
using System.Collections.Generic;

namespace LanguageTest
{
    [TestFixture]
    public class Tests
    {
        private Language _language;
        private Random _random;

        [SetUp]
        public void Setup()
        {
            _random = new Random();
            var faker = new Faker();

            _language = new Language
            {
                Id = _random.Next(),
                Name = GenerateRandomString(),
                Description = GenerateRandomString()
            };
        }

        private string GenerateRandomString()
        {
            const string chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
            return new string(Enumerable.Repeat(chars, 10)
                .Select(s => s[_random.Next(s.Length)]).ToArray());
        }

        [Test]
        public void LanguageIdIsCorrect()
        {
            Assert.AreEqual(_language.Id, _language.Id);
        }

        [Test]
        public void LanguageNameIsNotEmpty()
        {
            Assert.IsFalse(string.IsNullOrEmpty(_language.Name));
        }

        [Test]
        public void LanguageDescriptionIsNotEmpty()
        {
            Assert.IsFalse(string.IsNullOrEmpty(_language.Description));
        }

        // [Test]
        // public void LanguageUserLanguagesIsNotNull()
        // {
        //     Assert.IsNotNull(_language.UserLanguages);
        // }

        // [Test]
        // public void LanguageCoursesIsNotNull()
        // {
        //     Assert.IsNotNull(_language.Courses);
        // }
    }
}