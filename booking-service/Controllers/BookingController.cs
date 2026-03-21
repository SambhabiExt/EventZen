// using Microsoft.AspNetCore.Mvc;
// using booking_service.Models;

// namespace booking_service.Controllers;

// [ApiController]
// [Route("bookings")]
// public class BookingController : ControllerBase
// {
//     private static List<Booking> bookings = new List<Booking>();
//     private static int idCounter = 1;

    
//     [HttpGet]
//     public IActionResult GetBookings()
//     {
//         return Ok(bookings);
//     }


//     [HttpPost]
//     public IActionResult CreateBooking([FromBody] Booking booking)
//     {
//         booking.Id = idCounter++;
//         bookings.Add(booking);
//         return Ok("Booking created successfully");
//     }

//     [HttpDelete("{id}")]
//     public IActionResult DeleteBooking(int id)
//     {
//         bookings.RemoveAll(b => b.Id == id);
//         return Ok("Booking deleted successfully");
//     }
// }

using Microsoft.AspNetCore.Mvc;
using MySql.Data.MySqlClient;

[ApiController]
[Route("bookings")]
public class BookingController : ControllerBase
{
    string connectionString = "server=localhost;user=root;password=root123;database=eventzen_auth";
    

 [HttpPost]
public IActionResult CreateBooking([FromBody] Booking booking)
{
    using (var conn = new MySqlConnection(connectionString))
    {
        conn.Open();

        // CHECK CURRENT BOOKINGS
        string checkQuery = "SELECT SUM(seats) FROM bookings WHERE eventId = @eventId";
        var checkCmd = new MySqlCommand(checkQuery, conn);
        checkCmd.Parameters.AddWithValue("@eventId", booking.EventId);

        var result = checkCmd.ExecuteScalar();

        int bookedSeats = 0;
        if (result != DBNull.Value && result != null)
        {
            bookedSeats = Convert.ToInt32(result);
        }

        Console.WriteLine($"Booked: {bookedSeats}, Requested: {booking.Seats}, Capacity: {booking.Capacity}");

        // 🚨 VALIDATION (STRICT)
        if (booking.Seats <= 0)
        {
            return BadRequest("Invalid seats ❌");
        }

        if (bookedSeats + booking.Seats > booking.Capacity)
        {
            Console.WriteLine("❌ BLOCKED: Overbooking attempt");
            return BadRequest("Not enough seats available ❌");
        }

        // 🚀 INSERT ONLY IF VALID
        string query = "INSERT INTO bookings (userEmail, eventId, seats) VALUES (@userEmail, @eventId, @seats)";
        var cmd = new MySqlCommand(query, conn);

        cmd.Parameters.AddWithValue("@userEmail", booking.UserEmail);
        cmd.Parameters.AddWithValue("@eventId", booking.EventId);
        cmd.Parameters.AddWithValue("@seats", booking.Seats);

        cmd.ExecuteNonQuery();
    }

    return Ok("Booking successful ✅");
}
    // GET bookings
    [HttpGet("{email}")]
    public IActionResult GetUserBookings(string email)
 {
    var list = new List<Booking>();

    using (var conn = new MySqlConnection(connectionString))
    {
        conn.Open();

        string query = "SELECT * FROM bookings WHERE userEmail = @userEmail";
        var cmd = new MySqlCommand(query, conn);
        cmd.Parameters.AddWithValue("@userEmail", email);

        var reader = cmd.ExecuteReader();

        while (reader.Read())
        {
            list.Add(new Booking
            {
                Id = reader.GetInt32("id"),
                UserEmail = reader.GetString("userEmail"),
                EventId = reader.GetInt32("eventId"),
                Seats = reader.GetInt32("seats")
            });
        }
    }

    return Ok(list);
 }
    // DELETE booking
    [HttpDelete("{id}")]
    public IActionResult DeleteBooking(int id)
    {
        using (var conn = new MySqlConnection(connectionString))
        {
            conn.Open();

            string query = "DELETE FROM bookings WHERE id = @id";

            var cmd = new MySqlCommand(query, conn);
            cmd.Parameters.AddWithValue("@id", id);

            cmd.ExecuteNonQuery();
        }

        return Ok(new { message = "Booking cancelled" });
    }
}