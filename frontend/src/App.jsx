// import { useEffect, useState } from "react";
// import toast, { Toaster } from "react-hot-toast";

// function App() {
//   const [events, setEvents] = useState([]);
//   const [search, setSearch] = useState("");
//   const [filteredEvents, setFilteredEvents] = useState([]);

//   const [user, setUser] = useState(null);
//   const [showLogin, setShowLogin] = useState(false);
//   const [isSignup, setIsSignup] = useState(false);

//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   const [selectedEvent, setSelectedEvent] = useState(null);
//   const [seats, setSeats] = useState(1);

//   const [bookings, setBookings] = useState([]);
//   const [showBookings, setShowBookings] = useState(false);

//   const formatDate = (dateString) => {
//     const date = new Date(dateString);
//     const day = String(date.getDate()).padStart(2, "0");
//     const month = String(date.getMonth() + 1).padStart(2, "0");
//     const year = date.getFullYear();
//     return `${day}-${month}-${year}`;
//   };

 
//   const getEventImage = (category) => {
//     switch (category) {
//       case "music":
//         return "https://images.unsplash.com/photo-1507874457470-272b3c8d8ee2";
//       case "tech":
//         return "https://images.unsplash.com/photo-1518770660439-4636190af475";
//       case "art":
//         return "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee";
//       case "food":
//         return "https://images.unsplash.com/photo-1504674900247-0877df9cc836";
//       case "wellness":
//         return "https://images.unsplash.com/photo-1506126613408-eca07ce68773";
//       case "theatre":
//         return "https://images.unsplash.com/photo-1503095396549-807759245b35";
//       case "sports":
//         return "https://images.unsplash.com/photo-1505842465776-3bfd18837943";
//       default:
//         return "https://via.placeholder.com/400x300?text=Event";
//     }
//   };

 
//   useEffect(() => {
//     fetch("http://event-service:8080/events")
//       .then((res) => res.json())
//       .then((data) => {
//         setEvents(data);
//         setFilteredEvents(data);
//       });
//   }, []);


//   useEffect(() => {
//     const filtered = events.filter((e) =>
//       e.title.toLowerCase().includes(search.toLowerCase())
//     );
//     setFilteredEvents(filtered);
//   }, [search, events]);

//   const handleLogin = async () => {
//     const res = await fetch("http://auth-service:5001/api/auth/login", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ email, password }),
//     });

//     const data = await res.json();

//     if (res.ok) {
//       setUser(email);
//       setShowLogin(false);
//       toast.success("Logged in 🎉");
//     } else {
//       toast.error(data.message);
//     }
//   };

  
//   const handleRegister = async () => {
//     const res = await fetch("http://auth-service:5001/api/auth/register", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ name: "User", email, password }),
//     });

//     const data = await res.json();

//     if (res.ok) {
//       toast.success("Registered 🎉");
//       setIsSignup(false);
//     } else {
//       toast.error(data.message);
//     }
//   };

  
//   const handleBooking = async () => {
//     const res = await fetch("http://booking-service:8080/bookings", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({
//         userEmail: user,
//         eventId: selectedEvent.id,
//         seats: Number(seats),
//         capacity: selectedEvent.capacity,
//       }),
//     });

//     const text = await res.text();

//     if (res.ok) {
//       toast.success("Booking confirmed 🎉");
//     } else {
//       toast.error(text);
//     }

//     setSelectedEvent(null);
//   };

  
//   const fetchBookings = async () => {
//     const res = await fetch(`http://booking-service:8080/bookings/${user}`);
//     const data = await res.json();
//     setBookings(data);
//   };

  
//   const cancelBooking = async (id) => {
//     await fetch(`http://booking-service:8080/bookings/${id}`, {
//       method: "DELETE",
//     });

//     toast.success("Booking cancelled ❌");
//     fetchBookings();
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-black text-white">
//       <Toaster />

      
//       <div className="flex justify-between p-5 border-b border-gray-700">
//         <h1 className="text-2xl font-bold text-red-500">EventZen</h1>

//         <div className="flex gap-4">
//           <button onClick={() => setShowBookings(false)}>Events</button>

//           <button
//             onClick={() => {
//               setShowBookings(true);
//               fetchBookings();
//             }}
//           >
//             Bookings
//           </button>

//           {user ? (
//             <>
//               <span>{user}</span>
//               <button onClick={() => setUser(null)}>Logout</button>
//             </>
//           ) : (
//             <button onClick={() => setShowLogin(true)}>Login</button>
//           )}
//         </div>
//       </div>

      
//       {!showBookings && (
//         <div className="p-6">
//           <h1 className="text-4xl font-bold mb-2">
//             Discover Events 🎉
//           </h1>
//           <p className="text-gray-400 mb-4">
//             Find the best events near you
//           </p>

//           <input
//             placeholder="Search..."
//             className="p-2 w-full bg-gray-800 rounded"
//             onChange={(e) => setSearch(e.target.value)}
//           />
//         </div>
//       )}

      
//       {!showBookings && (
//         <div className="grid grid-cols-4 gap-6 p-6">
//           {filteredEvents.map((event) => (
//             <div
//               key={event.id}
//               className="bg-white/10 backdrop-blur rounded-xl overflow-hidden hover:scale-105 transition"
//             >
//               <img
//                 src={getEventImage(event.category)}
//                 className="h-48 w-full object-cover"
//                 onError={(e) => {
//                   e.target.src =
//                     "https://via.placeholder.com/400x300?text=Event";
//                 }}
//               />

//               <div className="p-4">
//                 <h2 className="font-bold text-lg">{event.title}</h2>
//                 <p className="text-gray-300">📍 {event.location}</p>
//                 <p className="text-gray-400">
//                   📅 {formatDate(event.date)}
//                 </p>

//                 <button
//                   onClick={() => setSelectedEvent(event)}
//                   className="mt-3 bg-red-500 px-3 py-1 rounded hover:bg-red-600"
//                 >
//                   Book Now
//                 </button>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}

      
//       {showBookings && (
//         <div className="p-6">
//           {bookings.length === 0 && (
//             <p>No bookings yet 😢</p>
//           )}

//           {bookings.map((b) => (
//             <div
//               key={b.id}
//               className="bg-gray-800 p-4 mb-3 rounded flex justify-between"
//             >
//               <div>
//                 Event ID: {b.eventId} | Seats: {b.seats}
//               </div>

//               <button
//                 onClick={() => cancelBooking(b.id)}
//                 className="bg-red-500 px-3 rounded"
//               >
//                 Cancel
//               </button>
//             </div>
//           ))}
//         </div>
//       )}

      
//       {selectedEvent && (
//         <div className="fixed inset-0 bg-black/70 flex justify-center items-center">
//           <div className="bg-gray-900 p-6 rounded">
//             <h2 className="text-lg font-bold">{selectedEvent.title}</h2>

//             <input
//               type="number"
//               value={seats}
//               min={1}
//               onChange={(e) => setSeats(e.target.value)}
//               className="p-2 mt-3 bg-gray-800 w-full"
//             />

//             <div className="flex gap-3 mt-4">
//               <button onClick={() => setSelectedEvent(null)}>
//                 Cancel
//               </button>

//               <button
//                 onClick={handleBooking}
//                 className="bg-green-500 px-3 py-1 rounded"
//               >
//                 Confirm
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

      
//       {showLogin && (
//         <div className="fixed inset-0 bg-black/70 flex justify-center items-center">
//           <div className="bg-gray-900 p-6 rounded w-80">
//             <input
//               placeholder="Email"
//               className="p-2 mb-3 w-full bg-gray-800"
//               onChange={(e) => setEmail(e.target.value)}
//             />

//             <input
//               placeholder="Password"
//               type="password"
//               className="p-2 mb-3 w-full bg-gray-800"
//               onChange={(e) => setPassword(e.target.value)}
//             />

//             <button
//               onClick={isSignup ? handleRegister : handleLogin}
//               className="bg-blue-500 w-full p-2 rounded"
//             >
//               {isSignup ? "Sign Up" : "Login"}
//             </button>

//             <p
//               className="mt-3 text-sm cursor-pointer"
//               onClick={() => setIsSignup(!isSignup)}
//             >
//               {isSignup
//                 ? "Already have an account? Login"
//                 : "Create account"}
//             </p>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// export default App;

import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";

function App() {
  const [role, setRole] = useState(null);

  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);

  const [user, setUser] = useState(null);
  const [showLogin, setShowLogin] = useState(false);
  const [isSignup, setIsSignup] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [selectedEvent, setSelectedEvent] = useState(null);
  const [seats, setSeats] = useState(1);

  const [bookings, setBookings] = useState([]);
  const [showBookings, setShowBookings] = useState(false);

  const [newEvent, setNewEvent] = useState({
    title: "",
    location: "",
    date: "",
    capacity: "",
    category: "",
  });

  // FETCH EVENTS
  useEffect(() => {
    fetch("http://localhost:8080/events")
      .then((res) => res.json())
      .then((data) => {
        setEvents(data);
        setFilteredEvents(data);
      });
  }, []);

  const formatDate = (dateString) => {
    if (!dateString) return "No date";
    const d = new Date(dateString);
    return `${d.getDate()}-${d.getMonth() + 1}-${d.getFullYear()}`;
  };

  const getEventImage = (category) => {
    switch (category) {
      case "music":
        return "https://images.unsplash.com/photo-1507874457470-272b3c8d8ee2";
      case "tech":
        return "https://images.unsplash.com/photo-1518770660439-4636190af475";
      case "art":
        return "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee";
      case "food":
        return "https://images.unsplash.com/photo-1504674900247-0877df9cc836";
      default:
        return "https://via.placeholder.com/400x300?text=Event";
    }
  };

  // LOGIN
  const handleLogin = async () => {
    try {
      const res = await fetch("http://localhost:5001/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        setUser(email);
        setShowLogin(false);
        toast.success("Logged in 🎉");
      } else {
        toast.error(data.message || "Login failed");
      }
    } catch {
      toast.error("Server error");
    }
  };

  // REGISTER
  const handleRegister = async () => {
    try {
      const res = await fetch("http://localhost:5001/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: "User", email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        toast.success("Registered 🎉");
        setIsSignup(false);
      } else {
        toast.error(data.message || "Register failed");
      }
    } catch {
      toast.error("Server error");
    }
  };

  // ADD EVENT
  const addEvent = async () => {
    const res = await fetch("http://localhost:8080/events", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newEvent),
    });

    if (res.ok) {
      toast.success("Event added 🎉");
      window.location.reload();
    } else {
      toast.error("Failed");
    }
  };

  // BOOKINGS
  const fetchBookings = async () => {
    try {
      const res = await fetch(`http://localhost:5002/bookings/${user}`);
      const data = await res.json();
      setBookings(data);
    } catch {
      toast.error("Booking service not working ❌");
    }
  };

  const handleBooking = async () => {
    if (!user) {
      toast.error("Login first ❌");
      return;
    }

    if (seats <= 0) {
      toast.error("Invalid seats ❌");
      return;
    }

    if (seats > selectedEvent.capacity) {
      toast.error("Seats not available ❌");
      return;
    }

    try {
      const res = await fetch("http://localhost:5002/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userEmail: user,
          eventId: selectedEvent.id,
          seats: Number(seats),
        }),
      });

      if (res.ok) {
        toast.success("Booked 🎉");
      } else {
        toast.error("Booking failed ❌");
      }
    } catch {
      toast.error("Booking service down ❌");
    }

    setSelectedEvent(null);
  };

  const cancelBooking = async (id) => {
    try {
      const res = await fetch(`http://localhost:5002/bookings/${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        toast.success("Cancelled ❌");
        fetchBookings();
      }
    } catch {
      toast.error("Error ❌");
    }
  };

  // ROLE SCREEN
  if (!role) {
    return (
      <div className="h-screen flex flex-col justify-center items-center bg-black text-white gap-6">
        <h1 className="text-3xl font-bold text-red-500">EventZen</h1>

        <div className="flex gap-6">
          <button onClick={() => setRole("admin")} className="bg-red-500 px-6 py-2 rounded">
            Admin
          </button>
          <button onClick={() => setRole("user")} className="bg-blue-500 px-6 py-2 rounded">
            User
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-black text-white">
      <Toaster />

      {/* NAVBAR */}
      <div className="flex justify-between p-5 border-b border-gray-700">
        <h1 className="text-2xl font-bold text-red-500">EventZen</h1>

        <div className="flex gap-4 items-center">
          {role === "user" && (
            <>
              <button onClick={() => setShowBookings(false)}>Events</button>
              <button
                onClick={() => {
                  setShowBookings(true);
                  fetchBookings();
                }}
              >
                Bookings
              </button>
            </>
          )}

          <button onClick={() => setRole(null)}>Switch Role</button>

          {user ? (
            <>
              <span>{user}</span>
              <button onClick={() => setUser(null)}>Logout</button>
            </>
          ) : (
            <button onClick={() => setShowLogin(true)}>Login</button>
          )}
        </div>
      </div>

      {/* LOGIN MODAL */}
      {showLogin && (
        <div className="fixed inset-0 bg-black/70 flex justify-center items-center">
          <div className="bg-gray-800 p-6 rounded-xl w-80 flex flex-col gap-3">
            <h2>{isSignup ? "Register" : "Login"}</h2>

            <input className="p-2 bg-gray-900 rounded" placeholder="Email"
              value={email} onChange={(e) => setEmail(e.target.value)} />

            <input type="password" className="p-2 bg-gray-900 rounded"
              placeholder="Password" value={password}
              onChange={(e) => setPassword(e.target.value)} />

            <button onClick={isSignup ? handleRegister : handleLogin}
              className="bg-red-500 py-2 rounded">
              {isSignup ? "Register" : "Login"}
            </button>

            <button onClick={() => setIsSignup(!isSignup)}
              className="text-sm text-gray-400">
              {isSignup ? "Already have account?" : "Create account"}
            </button>

            <button onClick={() => setShowLogin(false)} className="text-xs">
              Close
            </button>
          </div>
        </div>
      )}

      {/* ADMIN */}
      {role === "admin" && (
        <div className="p-6 flex justify-center">
          <div className="bg-gray-800 p-6 rounded-xl w-full max-w-xl">
            <h2 className="text-xl mb-4 text-center">Add Event</h2>

            <div className="flex flex-col gap-3">
              <input className="p-2 bg-gray-900 rounded" placeholder="Title"
                onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })} />

              <input className="p-2 bg-gray-900 rounded" placeholder="Location"
                onChange={(e) => setNewEvent({ ...newEvent, location: e.target.value })} />

              <input type="date" className="p-2 bg-gray-900 rounded"
                onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })} />

              <input type="number" className="p-2 bg-gray-900 rounded" placeholder="Capacity"
                onChange={(e) => setNewEvent({ ...newEvent, capacity: e.target.value })} />

              <input className="p-2 bg-gray-900 rounded" placeholder="Category"
                onChange={(e) => setNewEvent({ ...newEvent, category: e.target.value })} />

              <button onClick={addEvent} className="bg-green-500 py-2 rounded">
                Add Event
              </button>
            </div>
          </div>
        </div>
      )}

      {/* USER EVENTS */}
      {role === "user" && !showBookings && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-6">
          {filteredEvents.map((e) => (
            <div key={e.id} className="bg-white/10 rounded-xl overflow-hidden">
              <img src={getEventImage(e.category)} className="h-48 w-full object-cover" />

              <div className="p-4">
                <h2 className="font-bold">{e.title}</h2>
                <p>{e.location}</p>
                <p>{formatDate(e.date)}</p>

                <button
                  onClick={() => setSelectedEvent(e)}
                  className="mt-3 w-full bg-red-500 py-2 rounded"
                >
                  Book Now
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* BOOKINGS */}
      {role === "user" && showBookings && (
        <div className="p-6">
          <h2 className="text-xl mb-4">Your Bookings</h2>

          {bookings.map((b) => (
            <div key={b.id} className="bg-gray-800 p-4 mb-3 rounded">
              <p>Event ID: {b.eventId}</p>
              <p>Seats: {b.seats}</p>

              <button onClick={() => cancelBooking(b.id)}
                className="mt-2 bg-red-500 px-3 py-1 rounded">
                Cancel
              </button>
            </div>
          ))}
        </div>
      )}

      {/* 🔥 BOOKING MODAL */}
      {selectedEvent && (
        <div className="fixed inset-0 bg-black/70 flex justify-center items-center">
          <div className="bg-gray-800 p-6 rounded-xl w-80 flex flex-col gap-3">
            <h2 className="font-bold">{selectedEvent.title}</h2>

            <p>Available Seats: {selectedEvent.capacity}</p>

            <input
              type="number"
              min="1"
              value={seats}
              onChange={(e) => setSeats(e.target.value)}
              className="p-2 bg-gray-900 rounded"
            />

            <button onClick={handleBooking} className="bg-red-500 py-2 rounded">
              Confirm Booking
            </button>

            <button onClick={() => setSelectedEvent(null)} className="text-sm text-gray-400">
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;