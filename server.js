const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const db = require('./app/config/connection');
const {USER_NAME, PASSWORD} = require('./config')
const allRoutes = require('./routes/allRoutes')
const PORT = process.env.PORT || 3000

const app = express();
app.use(express.static('public'))

//database connection
db.connect((err) => {
    if (err) console.log("Connection failed" + err);
    else console.log("Database connected");
});

//view engine setup
app.set('views', path.join(__dirname, '/views'))
app.set('view engine', 'ejs')

//body parser middleware
app.use(bodyParser.urlencoded({extended: false, limit: '50mb'}));
app.use(bodyParser.json({limit: '50mb'}));

//Routing
app.use('/', allRoutes);

//port listening
app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`);
})

module.exports = app