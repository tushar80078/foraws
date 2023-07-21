const BookingsSchema=require("./Schemas/Bookings")

const enterBookings = async (bookingsData) => {
    const booking = await BookingsSchema.create(bookingsData);
    return booking;
  };
  
  const getAllBookingsByUserId = async (id) => {
    const allBookings = await BookingsSchema.find({ user: id }).populate("place");
    return allBookings;
  };
  
  module.exports = {
    enterBookings,
    getAllBookingsByUserId,
  };