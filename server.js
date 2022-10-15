// DEPENDENCIES
const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const config = require('./config/db');
const passport = require('passport');
//express sesssion
const expressSession = require('express-session')({
  secret: 'Lamar',
  resave: false,
  saveUninitialized: false, 
});
//Import the User Model
const Registration = require('./models/User')

//importing route files
const registrationRoutes = require('./routes/registerRoutes')

// ******* INSTANTIATIONS *******
const app = express();


// Setting up db connections
mongoose.connect(config.database,{ useNewUrlParser: true });
const db = mongoose.connection;

// Check connection
db.once('open', function(){

  console.log('Connected to MongoDB');
});
// Check for db errors
db.on('error', function(err){
  console.error(err);
});


// Configurations
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));
// app.set('views','views');



//******* MIDDLEWARE ************
app.use(express.static(path.join(__dirname, 'public')));
app.use('/public/uploads', express.static(__dirname + '/public/uploads'))
app.use(expressSession);

// Passport configuration middleware
app.use(passport.initialize());
app.use(passport.session());
passport.use(Registration.createStrategy());
passport.serializeUser(Registration.serializeUser());
passport.deserializeUser(Registration.deserializeUser());


  // To parse URL encoded data
app.use(express.urlencoded({ extended: false }));



// ROUTES
app.use('/', registrationRoutes)

app.get('/home', (req,res) =>{
  res.sendFile(__dirname + '/views/homepage.html')
})

app.get('/reg' , (req,res) =>{
  res.render('patients_register');
});

app.post('/reg', (req,res) =>{
  console.log(res.body);
  res.redirect('/home')
});



  // For invalid routes. always  be the last in the server file (index.js)
  app.get('*', (req, res) => { 
    res.send('404! This is an invalid URL.');
  });

  app.listen(4000, () => console.log('listening on port 4000'));
 
