export const getBookedSeats = (
  bus,
  searchData
) => {
  const bookings =
    JSON.parse(
      localStorage.getItem(
        "greenBusBookings"
      )
    ) || [];

  if (!bus) {
    return [];
  }

  const journeyDate =
    searchData?.date || "";

  const bookedSeats = [];

  bookings.forEach((booking) => {
    // Cancelled bookings release seats
    if (booking.status === "Cancelled") {
      return;
    }

    if (!booking.bus) {
      return;
    }

    const sameBus =
      booking.bus.id === bus.id ||
      booking.bus.name === bus.name;

    if (!sameBus) {
      return;
    }

    const bookingDate =
      booking.searchData?.date || "";

    if (bookingDate !== journeyDate) {
      return;
    }

    if (
      Array.isArray(
        booking.selectedSeats
      )
    ) {
      booking.selectedSeats.forEach(
        (seat) => {
          const number = Number(seat);

          if (
            !bookedSeats.includes(number)
          ) {
            bookedSeats.push(number);
          }
        }
      );
    }
  });

  return bookedSeats;
};