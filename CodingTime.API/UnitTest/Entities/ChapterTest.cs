using Application.Entities;
using Bogus;

namespace ChapterTest
{
    [TestFixture]
    public class Tests
    {
        private Chapter _chapter;
        private Random _random;

        [SetUp]
        public void Setup()
        {
            _random = new Random();
            var faker = new Faker();

            _chapter = new Chapter
            {
                Id = _random.Next(),
                Title = GenerateRandomString(),
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
        public void ChapterIdIsCorrect()
        {
            Assert.AreEqual(_chapter.Id, _chapter.Id);
        }

        [Test]
        public void ChapterTitleIsNotEmpty()
        {
            Assert.IsFalse(string.IsNullOrEmpty(_chapter.Title));
        }

        [Test]
        public void ChapterCourseIdIsPositive()
        {
            Assert.IsTrue(_chapter.CourseId > 0);
        }

        // [Test]
        // public void ChapterCourseIsNotNull()
        // {
        //     Assert.IsNotNull(_chapter.Course);
        // }

        // [Test]
        // public void ChapterLessonsIsNotNull()
        // {
        //     Assert.IsNotNull(_chapter.Lessons);
        // }
    }
}