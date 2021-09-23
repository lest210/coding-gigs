const express = require('express');
const exphbs = require('express-handlebars');
const path = require('path');


const db = require('./config/db');


db.authenticate()
  .then(() => console.log('Database connected...'))
  .catch(err => console.log('Error: ' + err))

const app = express();


app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');


app.use(express.urlencoded({ extended: false }));


app.use(express.static(path.join(__dirname, 'public')));


app.get('/', (req, res) => res.render('index', { layout: 'landing' }));


app.use('/gigs', require('./routes/gigs'));

const PORT = process.env.PORT || 3001;

app.listen(PORT, console.log(`Server started on port ${PORT}`));