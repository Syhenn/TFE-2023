﻿using System.Text.Json.Serialization;

namespace Application.Entities;

public class Course
{
    public int Id { get; set; }
    public string Title { get; set; }
    public string Description { get; set; }

    public int LanguageId { get; set; }
    public Language Language { get; set; }

    [JsonIgnore]public ICollection<Chapter> Chapters { get; set; } = new List<Chapter>();
}