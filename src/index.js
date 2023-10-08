const express = require('express');
const handlebars = require('express-handlebars');
const path = require('path');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');

const {auth} = require('./middlewares/authMiddleware')
 
const routes = require('./routes');
const { errorHandler } = require('./middlewares/errorHandlerMiddleware');
const { PORT } = require('.//config/config')

const app = express();

//TODO: change DB name
mongoose.connect('mongodb://127.0.0.1:27017/animalsDonations')
    .then(() => console.log('DB connected!'))
    .catch((err) => console.log('DB Error: ', err.message));


app.engine('hbs', handlebars.engine({
    extname: 'hbs'
}));
app.set('view engine', 'hbs');
app.set('views', 'src/views');

// app.use(express.static('src/public'));
app.use(express.static(path.resolve(__dirname, 'public')));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// It`s very impotrtant authMiddleware to be after cookieParser;
app.use(auth)
app.use(routes);
// after routes!
app.use(errorHandler);





app.listen(PORT, console.log(`Server is listening on port ${PORT}...`));