const express = require('express');
const cors = require('cors');

const dbConnect = require('./utilities/dbConnect');
const partRoutes = require('./routes/v1/part.route');
const viewCount = require('./middleware/viewCount');
const errorHandler = require('./middleware/errorHandler');
require('dotenv').config()
const port = process.env.PORT || 5000
const app = express();




// middleware
app.use(cors());
app.use(express.json());

app.use(express.static("public"));
app.set("view engine", "ejs");


// app.use(viewCount);


// Apply the rate limiting middleware to all requests
// app.use(limiter)



dbConnect();

app.use('/api/v1/part', partRoutes);


app.get("/", (req, res) => {
    // res.sendFile(__dirname + "/public/test.html")

    res.render("home.ejs", {
        id: 2,
        user: {
            name: "test"
        }
    });
});


app.all("*", (req, res) => {
    res.send('No Route Found')
})

app.use(errorHandler);

app.listen(port, () => {
    console.log('Listening to port', port)
})


process.on("unhandledRejection", (error) => {
    console.log(error.name, error.message)
    app.close(() => {
        process.exit(1);
    })
})