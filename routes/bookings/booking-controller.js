const { getEventByID, updateEvent } = require("../events/event-controller")
const Booking = require("./booking-model")

const createBooking = async (bookingData) => {
    try {
        // the user creates a booking for a certain event
        
        
        // we need to calculate the total price of that event (quantity * price)
        // quantity - bookingData.quantity
        // price - event - bookingData.event (ObjectId)
        // Event we need <- getEventById(bookingData.event)
        const event = await getEventByID(bookingData.event)

        const totalPrice = event.price * bookingData.quantity;
        bookingData.totalPrice = totalPrice;

        // subtract from available tickets
        const newAvailableTickets = event.availableTickets - bookingData.quantity;

        // update event with new amount of tickets
        await updateEvent(bookingData.event, { availableTickets: newAvailableTickets });

        // create the new booking
        const booking = await Booking.create(bookingData)
        return booking

    } catch (error) {
        throw error
    }
}

module.exports = { createBooking }