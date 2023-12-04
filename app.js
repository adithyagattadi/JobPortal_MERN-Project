const express = require("express");
const app = express();
const mongoose = require("mongoose");
const morgan = require("morgan");
const bodyParser = require("body-parser");
require("dotenv").config();
var cors = require("cors");

// Import routes
const authRoutes = require("./routes/authRoutes")
const userRoutes = require("./routes/userRoutes")
const jobTypeRoutes = require("./routes/jobTypeRoutes")
const jobsRoutes = require("./routes/jobsRoutes")

const cookieParser = require("cookie-parser");
const errorHandler = require("./middleware/error")


// Database Connection
mongoose.connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
}).then(() => {
    console.log("DB Connected");
})
.catch((err) => {
    console.log(err);
});


// MIDDLEWARE
app.use(morgan('dev'));
app.use(bodyParser.json({limit: "5mb"}))
app.use(bodyParser.urlencoded({
    limit: "5mb",
    extended: true
}));
app.use(cookieParser());
app.use(cors());

// Routes
// app.get('/',  (req,res) => {
//     res.send("Hello from Node JS")
// })
app.use('/api', authRoutes);
app.use('/api', userRoutes);
app.use('/api', jobTypeRoutes);
app.use('/api', jobsRoutes);

// error MIDDLEWARE
app.use(errorHandler);

// PORT
const port = process.env.PORT || 8000

app.listen(port, () => {
    console.log(`Server running on port ${port}`)
})