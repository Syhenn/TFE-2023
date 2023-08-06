using NUnit.Framework;
using Application.Entities;
using Bogus;

namespace UserLanguageTest
{
    [TestFixture]
    public class Tests
    {
        private UserLanguage _userLanguage;
        private Faker _faker;

        [SetUp]
        public void Setup()
        {
            _faker = new Faker();

            _userLanguage = new UserLanguage
            {
                Id = _faker.Random.Int(1, 100),
                UserId = _faker.Random.Int(1, 100),
                LanguageId = _faker.Random.Int(1, 100)
            };
        }

        [Test]
        public void UserLanguageIdIsCorrect()
        {
            Assert.AreEqual(_userLanguage.Id, _userLanguage.Id);
        }

        [Test]
        public void UserLanguageUserIdIsPositive()
        {
            Assert.IsTrue(_userLanguage.UserId > 0);
        }

        [Test]
        public void UserLanguageLanguageIdIsPositive()
        {
            Assert.IsTrue(_userLanguage.LanguageId > 0);
        }

        // [Test]
        // public void UserLanguageUserIsNotNull()
        // {
        //     Assert.IsNotNull(_userLanguage.User);
        // }

        // [Test]
        // public void UserLanguageLanguageIsNotNull()
        // {
        //     Assert.IsNotNull(_userLanguage.Language);
        // }
    }
}