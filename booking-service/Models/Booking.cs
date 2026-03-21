// namespace booking_service.Models;

// public class Booking
// {
//     public int Id { get; set; }
//     public int UserId { get; set; }
//     public int EventId { get; set; }
// }

public class Booking
{
    public int Id { get; set; }
    public string UserEmail { get; set; }
    public int EventId { get; set; }
    public int Seats { get; set; }
    public int Capacity { get; set; }
}