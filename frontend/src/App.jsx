// import { useEffect, useState } from "react";

// function App() {
//   const [events, setEvents] = useState([]);
//   const [filteredEvents, setFilteredEvents] = useState([]);
//   const [search, setSearch] = useState("");

//   const [showLogin, setShowLogin] = useState(false);
//   const [isSignup, setIsSignup] = useState(false);

//   const [user, setUser] = useState(null);

//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   const [selectedEvent, setSelectedEvent] = useState(null);
//   const [seats, setSeats] = useState(1);

//   const [showBookings, setShowBookings] = useState(false);
//   const [bookings, setBookings] = useState([]);

//   // FETCH EVENTS
//   useEffect(() => {
//     fetch("http://localhost:8080/events")
//       .then((res) => res.json())
//       .then((data) => {
//         setEvents(data);
//         setFilteredEvents(data);
//       });
//   }, []);

//   // SEARCH FILTER
//   useEffect(() => {
//     const filtered = events.filter(
//       (e) =>
//         e.title.toLowerCase().includes(search.toLowerCase()) ||
//         e.location.toLowerCase().includes(search.toLowerCase())
//     );
//     setFilteredEvents(filtered);
//   }, [search, events]);

//   // LOGIN
//   const handleLogin = async () => {
//     const res = await fetch("http://localhost:5001/api/auth/login", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({ email, password }),
//     });

//     const data = await res.json();

//     if (res.ok) {
//       localStorage.setItem("token", data.token);
//       setUser(email);
//       setShowLogin(false);
//       alert("Login successful 🎉");
//     } else {
//       alert(data.message);
//     }
//   };

//   // REGISTER
//   const handleRegister = async () => {
//     const res = await fetch("http://localhost:5001/api/auth/register", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({ name: "User", email, password }),
//     });

//     const data = await res.json();

//     if (res.ok) {
//       alert("Registered successfully 🎉");
//       setIsSignup(false);
//     } else {
//       alert(data.message);
//     }
//   };

//   // BOOK EVENT
//   const handleBooking = async () => {
//   const res = await fetch("http://localhost:5124/bookings", {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({
//       userEmail: user,
//       eventId: selectedEvent.id,
//       seats: seats,
//       capacity: selectedEvent.capacity,
//     }),
//   });

//   const data = await res.text();

//   if (res.ok) {
//     alert("Booking successful 🎉");
//   } else {
//     alert(data); // ❌ shows error properly
//   }

//   setSelectedEvent(null);
//  };

//   // FETCH BOOKINGS
//   const fetchBookings = async () => {
//     const res = await fetch(`http://localhost:5124/bookings/${user}`);
//     const data = await res.json();
//     setBookings(data);
//   };

//   // CANCEL BOOKING
//   const cancelBooking = async (id) => {
//     await fetch(`http://localhost:5124/bookings/${id}`, {
//       method: "DELETE",
//     });

//     fetchBookings();
//   };

//   return (
//     <div className="bg-[#0f172a] min-h-screen text-white">

//       {/* NAVBAR */}
//       <div className="flex justify-between items-center px-8 py-4 border-b border-gray-700">
//         <h1 className="text-2xl font-bold text-red-500">EventZen</h1>

//         <div className="flex gap-4 items-center">
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
//             <div className="flex items-center gap-3">
//               <span className="text-green-400">{user}</span>
//               <button
//                 onClick={() => {
//                   localStorage.removeItem("token");
//                   setUser(null);
//                 }}
//                 className="bg-gray-600 px-3 py-1 rounded"
//               >
//                 Logout
//               </button>
//             </div>
//           ) : (
//             <button onClick={() => setShowLogin(true)}>Login</button>
//           )}
//         </div>
//       </div>

//       {/* SEARCH */}
//       {!showBookings && (
//         <div className="p-8">
//           <h2 className="text-4xl font-bold mb-4">Discover Events 🎉</h2>

//           <input
//             type="text"
//             placeholder="Search events or city..."
//             className="w-full md:w-1/2 p-3 rounded bg-[#1e293b]"
//             value={search}
//             onChange={(e) => setSearch(e.target.value)}
//           />
//         </div>
//       )}

//       {/* EVENTS */}
//       {!showBookings && (
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-8 pb-10">
//           {filteredEvents.map((event, i) => (
//             <div key={i} className="bg-[#1e293b] rounded-xl overflow-hidden">
//               <img
//                 src={`https://picsum.photos/400/300?random=${i}`}
//                 className="w-full h-60 object-cover"
//               />

//               <div className="p-4">
//                 <h3 className="text-lg font-bold">{event.title}</h3>
//                 <p className="text-gray-400">{event.location}</p>
//                 <p className="text-gray-500 text-sm">{event.date}</p>

//                 <button
//                   onClick={() => setSelectedEvent(event)}
//                   className="mt-3 bg-red-500 px-4 py-1 rounded"
//                 >
//                   Book Now
//                 </button>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}

//       {/* BOOKINGS PAGE */}
//       {showBookings && (
//         <div className="px-8 pt-6">
//           <h2 className="text-2xl mb-4">My Bookings</h2>

//           {bookings.length === 0 ? (
//             <p>No bookings yet</p>
//           ) : (
//             bookings.map((b) => (
//               <div
//                 key={b.id}
//                 className="bg-[#1e293b] p-4 mb-3 rounded flex justify-between"
//               >
//                 <div>
//                   <p>Event ID: {b.eventId}</p>
//                   <p>Seats: {b.seats}</p>
//                 </div>

//                 <button
//                   onClick={() => cancelBooking(b.id)}
//                   className="bg-red-500 px-3 py-1 rounded"
//                 >
//                   Cancel
//                 </button>
//               </div>
//             ))
//           )}
//         </div>
//       )}

//       {/* LOGIN MODAL */}
//       {showLogin && (
//         <div className="fixed inset-0 bg-black/70 flex items-center justify-center">
//           <div className="bg-[#1e293b] p-6 rounded-xl w-80">

//             <h2 className="text-xl font-bold mb-4 text-center">
//               {isSignup ? "Sign Up" : "Login"}
//             </h2>

//             <input
//               type="email"
//               placeholder="Email"
//               className="w-full p-2 mb-3 rounded bg-gray-800"
//               onChange={(e) => setEmail(e.target.value)}
//             />

//             <input
//               type="password"
//               placeholder="Password"
//               className="w-full p-2 mb-4 rounded bg-gray-800"
//               onChange={(e) => setPassword(e.target.value)}
//             />

//             <button
//               onClick={isSignup ? handleRegister : handleLogin}
//               className="w-full bg-red-500 py-2 rounded mb-3"
//             >
//               {isSignup ? "Sign Up" : "Login"}
//             </button>

//             <p
//               className="text-sm text-center cursor-pointer text-gray-400"
//               onClick={() => setIsSignup(!isSignup)}
//             >
//               {isSignup
//                 ? "Already have an account? Login"
//                 : "New user? Sign up"}
//             </p>

//             <button
//               onClick={() => setShowLogin(false)}
//               className="w-full mt-3 bg-gray-600 py-1 rounded"
//             >
//               Cancel
//             </button>

//           </div>
//         </div>
//       )}

//       {/* BOOKING POPUP */}
//       {selectedEvent && (
//         <div className="fixed inset-0 bg-black/70 flex items-center justify-center">
//           <div className="bg-[#1e293b] p-6 rounded-xl w-80">

//             <h2 className="text-lg font-bold mb-3">
//               {selectedEvent.title}
//             </h2>

//             <input
//               type="number"
//               min="1"
//               value={seats}
//               onChange={(e) => setSeats(e.target.value)}
//               className="w-full p-2 mb-4 rounded bg-gray-800"
//             />

//             <div className="flex justify-between">
//               <button
//                 onClick={() => setSelectedEvent(null)}
//                 className="bg-gray-600 px-4 py-2 rounded"
//               >
//                 Cancel
//               </button>

//               <button
//                 onClick={handleBooking}
//                 className="bg-red-500 px-4 py-2 rounded"
//               >
//                 Confirm
//               </button>
//             </div>

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
  const [events, setEvents] = useState([]);
  const [search, setSearch] = useState("");
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

  // 🎯 FORMAT DATE (DD-MM-YYYY)
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  // 🎯 CATEGORY IMAGE FUNCTION
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
      case "wellness":
        return "https://images.unsplash.com/photo-1506126613408-eca07ce68773";
      case "theatre":
        return "https://images.unsplash.com/photo-1503095396549-807759245b35";
      case "sports":
        return "https://images.unsplash.com/photo-1505842465776-3bfd18837943";
      default:
        return "https://via.placeholder.com/400x300?text=Event";
    }
  };

  // FETCH EVENTS
  useEffect(() => {
    fetch("http://localhost:8080/events")
      .then((res) => res.json())
      .then((data) => {
        setEvents(data);
        setFilteredEvents(data);
      });
  }, []);

  // SEARCH
  useEffect(() => {
    const filtered = events.filter((e) =>
      e.title.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredEvents(filtered);
  }, [search, events]);

  // LOGIN
  const handleLogin = async () => {
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
      toast.error(data.message);
    }
  };

  // REGISTER
  const handleRegister = async () => {
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
      toast.error(data.message);
    }
  };

  // BOOK EVENT
  const handleBooking = async () => {
    const res = await fetch("http://localhost:5124/bookings", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userEmail: user,
        eventId: selectedEvent.id,
        seats: Number(seats),
        capacity: selectedEvent.capacity,
      }),
    });

    const text = await res.text();

    if (res.ok) {
      toast.success("Booking confirmed 🎉");
    } else {
      toast.error(text);
    }

    setSelectedEvent(null);
  };

  // FETCH BOOKINGS
  const fetchBookings = async () => {
    const res = await fetch(`http://localhost:5124/bookings/${user}`);
    const data = await res.json();
    setBookings(data);
  };

  // CANCEL BOOKING
  const cancelBooking = async (id) => {
    await fetch(`http://localhost:5124/bookings/${id}`, {
      method: "DELETE",
    });

    toast.success("Booking cancelled ❌");
    fetchBookings();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-black text-white">
      <Toaster />

      {/* NAVBAR */}
      <div className="flex justify-between p-5 border-b border-gray-700">
        <h1 className="text-2xl font-bold text-red-500">EventZen</h1>

        <div className="flex gap-4">
          <button onClick={() => setShowBookings(false)}>Events</button>

          <button
            onClick={() => {
              setShowBookings(true);
              fetchBookings();
            }}
          >
            Bookings
          </button>

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

      {/* DISCOVER + SEARCH */}
      {!showBookings && (
        <div className="p-6">
          <h1 className="text-4xl font-bold mb-2">
            Discover Events 🎉
          </h1>
          <p className="text-gray-400 mb-4">
            Find the best events near you
          </p>

          <input
            placeholder="Search..."
            className="p-2 w-full bg-gray-800 rounded"
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      )}

      {/* EVENTS */}
      {!showBookings && (
        <div className="grid grid-cols-4 gap-6 p-6">
          {filteredEvents.map((event) => (
            <div
              key={event.id}
              className="bg-white/10 backdrop-blur rounded-xl overflow-hidden hover:scale-105 transition"
            >
              <img
                src={getEventImage(event.category)}
                className="h-48 w-full object-cover"
                onError={(e) => {
                  e.target.src =
                    "https://via.placeholder.com/400x300?text=Event";
                }}
              />

              <div className="p-4">
                <h2 className="font-bold text-lg">{event.title}</h2>
                <p className="text-gray-300">📍 {event.location}</p>
                <p className="text-gray-400">
                  📅 {formatDate(event.date)}
                </p>

                <button
                  onClick={() => setSelectedEvent(event)}
                  className="mt-3 bg-red-500 px-3 py-1 rounded hover:bg-red-600"
                >
                  Book Now
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* BOOKINGS */}
      {showBookings && (
        <div className="p-6">
          {bookings.length === 0 && (
            <p>No bookings yet 😢</p>
          )}

          {bookings.map((b) => (
            <div
              key={b.id}
              className="bg-gray-800 p-4 mb-3 rounded flex justify-between"
            >
              <div>
                Event ID: {b.eventId} | Seats: {b.seats}
              </div>

              <button
                onClick={() => cancelBooking(b.id)}
                className="bg-red-500 px-3 rounded"
              >
                Cancel
              </button>
            </div>
          ))}
        </div>
      )}

      {/* BOOK POPUP */}
      {selectedEvent && (
        <div className="fixed inset-0 bg-black/70 flex justify-center items-center">
          <div className="bg-gray-900 p-6 rounded">
            <h2 className="text-lg font-bold">{selectedEvent.title}</h2>

            <input
              type="number"
              value={seats}
              min={1}
              onChange={(e) => setSeats(e.target.value)}
              className="p-2 mt-3 bg-gray-800 w-full"
            />

            <div className="flex gap-3 mt-4">
              <button onClick={() => setSelectedEvent(null)}>
                Cancel
              </button>

              <button
                onClick={handleBooking}
                className="bg-green-500 px-3 py-1 rounded"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}

      {/* LOGIN MODAL */}
      {showLogin && (
        <div className="fixed inset-0 bg-black/70 flex justify-center items-center">
          <div className="bg-gray-900 p-6 rounded w-80">
            <input
              placeholder="Email"
              className="p-2 mb-3 w-full bg-gray-800"
              onChange={(e) => setEmail(e.target.value)}
            />

            <input
              placeholder="Password"
              type="password"
              className="p-2 mb-3 w-full bg-gray-800"
              onChange={(e) => setPassword(e.target.value)}
            />

            <button
              onClick={isSignup ? handleRegister : handleLogin}
              className="bg-blue-500 w-full p-2 rounded"
            >
              {isSignup ? "Sign Up" : "Login"}
            </button>

            <p
              className="mt-3 text-sm cursor-pointer"
              onClick={() => setIsSignup(!isSignup)}
            >
              {isSignup
                ? "Already have an account? Login"
                : "Create account"}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;