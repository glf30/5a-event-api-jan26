const express = require("express");
const logger = require("morgan");
const connectToMongoDB = require("./database/connectToMongoDB")

const app = express();

const PORT = 3000;

app.use(express.json())
app.use(logger("dev"))

const usersRouter = require("./routes/users/user-router")
app.use("/api/users", usersRouter)

const eventRouter = require("./routes/events/event-router")
app.use("/api/events", eventRouter)

const bookingsRouter = require("./routes/bookings/booking-router")
app.use("/api/bookings", bookingsRouter)

app.listen(PORT, () => {
    console.log(`Server is listening on PORT: ${PORT}`);
    connectToMongoDB();
})