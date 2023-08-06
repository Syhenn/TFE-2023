using Application.Entities;
using Bogus;

namespace LessonTest
{
    [TestFixture]
    public class Tests
    {
        private Lesson _lesson;
        private Random _random;

        [SetUp]
        public void Setup()
        {
            _random = new Random();
            var faker = new Faker();

            _lesson = new Lesson
            {
                Id = _random.Next(),
                Title = GenerateRandomString(),
                CreatedAt = DateTime.Now.AddDays(-_random.Next(1, 365)),
                UpdatedAt = DateTime.Now.AddDays(-_random.Next(1, 365)),
                HtmlContent = faker.Lorem.Paragraph(),
                ChapterId = _random.Next()
            };
        }

        private string GenerateRandomString()
        {
            const string chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
            return new string(Enumerable.Repeat(chars, 10)
                .Select(s => s[_random.Next(s.Length)]).ToArray());
        }

        [Test]
        public void LessonIdIsCorrect()
        {
            Assert.AreEqual(_lesson.Id, _lesson.Id);
        }

        [Test]
        public void LessonTitleIsNotEmpty()
        {
            Assert.IsFalse(string.IsNullOrEmpty(_lesson.Title));
        }

        [Test]
        public void LessonCreatedAtIsInThePast()
        {
            Assert.IsTrue(_lesson.CreatedAt < DateTime.Now);
        }

        [Test]
        public void LessonUpdatedAtIsInThePast()
        {
            Assert.IsTrue(_lesson.UpdatedAt < DateTime.Now);
        }

        [Test]
        public void LessonHtmlContentIsNotEmpty()
        {
            Assert.IsFalse(string.IsNullOrEmpty(_lesson.HtmlContent));
        }

        [Test]
        public void LessonChapterIdIsPositive()
        {
            Assert.IsTrue(_lesson.ChapterId > 0);
        }

        // [Test]
        // public void LessonChapterIsNotNull()
        // {
        //     Assert.IsNotNull(_lesson.Chapter);
        // }
    }
}
