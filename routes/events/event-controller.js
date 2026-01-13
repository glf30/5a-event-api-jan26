const Event = require("./event-model")

const getEvents = async () => {
    try {
        const events = await Event.find();
        return events;
    } catch (error) {
        throw error
    }
}

const getEventByID = async (id) => {
    try {
        const event = await Event.findById(id)
        return event;
    } catch (error) {
        throw error
    }
}

const createEvent = async (eventData) => {
    try {
        const newEvent = Event.create(eventData)
        return newEvent
    } catch (error) {
        throw error
    }
}

module.exports = {
    createEvent,
    getEvents,
    getEventByID
}