export const getBookedSeats = (bus, searchData) => {
  const bookings =
    JSON.parse(
      localStorage.getItem("greenBusBookings")
    ) || [];

  if (!bus) {
    return [];
  }

  const journeyDate = searchData?.date || "";

  const bookedSeats = [];

  bookings.forEach((booking) => {
    // Cancelled bookings should NOT block seats
    if (booking.status === "Cancelled") {
      return;
    }

    if (!booking.bus) {
      return;
    }

    // Match bus
    const sameBus =
      booking.bus.id === bus.id ||
      booking.bus.name === bus.name;

    if (!sameBus) {
      return;
    }

    // Match journey date
    const bookingDate =
      booking.searchData?.date || "";

    if (bookingDate !== journeyDate) {
      return;
    }

    // Add booked seats
    if (Array.isArray(booking.selectedSeats)) {
      booking.selectedSeats.forEach((seat) => {
        if (!bookedSeats.includes(Number(seat))) {
          bookedSeats.push(Number(seat));
        }
      });
    }
  });

  return bookedSeats;
};