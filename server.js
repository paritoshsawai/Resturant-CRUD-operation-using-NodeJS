const express = require("express");
const colors = require("colors");
const cors = require("cors");
const morgan = require("morgan");
const dotenv = require("dotenv");
const connectDb = require("./config/db");

//Dot env Configuration
dotenv.config();

//Connection
connectDb();

//Rest
const app = express();

//Middleware
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));


//Route
app.use("/api/v1/test", require("./routes/testroutes"));
app.use("/api/v1/auth", require("./routes/authRoutes"));
app.use("/api/v1/user", require("./routes/userRoutes"));
app.use("/api/v1/resturant", require("./routes/resturantRoutes"));
app.use("/api/v1/category", require("./routes/categoryRoutes"));
app.use("/api/v1/food", require("./routes/foodRoutes"));



app.get("/", (req, res) => {
     return res.status(200).send("<h1>WElcome to Food Server</>");
});

const PORT = process.env.PORT || 8080;

//Listen

app.listen(PORT, () => {
    console.log(`Server running at ${PORT}`.bgGreen.bgYellow);
});