namespace Application.Entities;

public class LeaderboardEntry
{
    public int Id { get; set; }
    public int UserId { get; set; }
    public int Points { get; set; }
    public DateTime LastUpdateAt { get; set; }

    public User User { get; set; }
}