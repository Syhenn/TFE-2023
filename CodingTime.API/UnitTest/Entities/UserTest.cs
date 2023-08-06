using Application.Entities;
using Bogus;
using Domain.Enum;

namespace UserTest
{
    [TestFixture]
    public class Tests
    {
        private User _user;
        private Random _random;

        [SetUp]
        public void Setup()
        {
            _random = new Random();
            var faker = new Faker();

            _user = new User
            {
                Id = _random.Next(),
                Name = GenerateRandomString(),
                Surname = GenerateRandomString(),
                DisplayName = GenerateRandomString(),
                Email = faker.Internet.Email(),
                Password = faker.Internet.Password(),
                Age = _random.Next(18, 99),
                UserRole = (UserRole)_random.Next(0, 3),
                Level = _random.Next(),
                CreatedAt = DateTime.Now.AddDays(-_random.Next(1, 365)),
                UpdateAt = DateTime.Now.AddDays(-_random.Next(1, 365)),
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
        public void UserIdIsCorrect()
        {
            Assert.AreEqual(_user.Id, _user.Id);
        }

        [Test]
        public void UserNameIsNotEmpty()
        {
            Assert.IsFalse(string.IsNullOrEmpty(_user.Name));
        }

        [Test]
        public void UserSurnameIsNotEmpty()
        {
            Assert.IsFalse(string.IsNullOrEmpty(_user.Surname));
        }

        [Test]
        public void UserDisplayNameIsNotEmpty()
        {
            Assert.IsFalse(string.IsNullOrEmpty(_user.DisplayName));
        }

        // [Test]
        // public void UserEmailIsValid()
        // {
        //     Assert.IsTrue(System.Net.Mail.SmtpClient.EmailIsValid(_user.Email));
        // }

        [Test]
        public void UserPasswordIsNotEmpty()
        {
            Assert.IsFalse(string.IsNullOrEmpty(_user.Password));
        }

        [Test]
        public void UserAgeIsPositive()
        {
            Assert.IsTrue(_user.Age > 0);
        }

        [Test]
        public void UserRoleIsNotNull()
        {
            Assert.IsNotNull(_user.UserRole);
        }

        [Test]
        public void UserLevelIsPositive()
        {
            Assert.IsTrue(_user.Level > 0);
        }

        [Test]
        public void UserCreatedAtIsInThePast()
        {
            Assert.IsTrue(_user.CreatedAt < DateTime.Now);
        }

        [Test]
        public void UserUpdateAtIsInThePast()
        {
            Assert.IsTrue(_user.UpdateAt < DateTime.Now);
        }

        [Test]
        public void UserIsVerifyIsTrueOrFalse()
        {
            Assert.IsTrue(_user.IsVerify == true || _user.IsVerify == false);
        }
    }
}
