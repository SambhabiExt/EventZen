
using Microsoft.AspNetCore.Mvc;
using MySql.Data.MySqlClient;

[ApiController]
[Route("bookings")]
public class BookingController : ControllerBase
{
    string connectionString = "server=mysql;user=root;password=root123;database=eventzen";

    [HttpPost]
    public IActionResult CreateBooking([FromBody] Booking booking)
    {
        using (var conn = new MySqlConnection(connectionString))
        {
            conn.Open();

            
            string capacityQuery = "SELECT capacity FROM events WHERE id = @eventId";
            var capacityCmd = new MySqlCommand(capacityQuery, conn);
            capacityCmd.Parameters.AddWithValue("@eventId", booking.EventId);

            var capacityResult = capacityCmd.ExecuteScalar();

            if (capacityResult == null)
            {
                return BadRequest("Event not found ❌");
            }

            int capacity = Convert.ToInt32(capacityResult);

            
            string checkQuery = "SELECT SUM(seats) FROM bookings WHERE eventId = @eventId";
            var checkCmd = new MySqlCommand(checkQuery, conn);
            checkCmd.Parameters.AddWithValue("@eventId", booking.EventId);

            var result = checkCmd.ExecuteScalar();

            int bookedSeats = 0;
            if (result != DBNull.Value && result != null)
            {
                bookedSeats = Convert.ToInt32(result);
            }

            Console.WriteLine($"Booked: {bookedSeats}, Requested: {booking.Seats}, Capacity: {capacity}");

            
            if (booking.Seats <= 0)
            {
                return BadRequest("Invalid seats ❌");
            }

            if (bookedSeats + booking.Seats > capacity)
            {
                return BadRequest("Not enough seats available ❌");
            }

            
            string query = "INSERT INTO bookings (userEmail, eventId, seats) VALUES (@userEmail, @eventId, @seats)";
            var cmd = new MySqlCommand(query, conn);

            cmd.Parameters.AddWithValue("@userEmail", booking.UserEmail);
            cmd.Parameters.AddWithValue("@eventId", booking.EventId);
            cmd.Parameters.AddWithValue("@seats", booking.Seats);

            cmd.ExecuteNonQuery();
        }

        return Ok("Booking successful ✅");
    }

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