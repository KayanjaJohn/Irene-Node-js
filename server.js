// Dependencies
const express = require('express');
const path = require('path');


// ******* Instantiations *******
const app = express();

// Configurations
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));
app.set('views','views');



//******* Middleware ************
app.use(express.static(path.join(__dirname, 'public')));
app.use('/public/uploads', express.static(__dirname + '/public/uploads'))

// app.use((req, res, next) => {
//   console.log("A new request received at " + Date.now());
//   next();  
// });

  // Simple request time logger
  // app.use('/about',(req, res, next) => {
  //   console.log("A new request received at " + Date.now());
  
    // This function call tells that more processing is
    // required for the current request and is in the next middleware
    // function/route handler.
  //   next();  
  // });

  // To parse URL encoded data
app.use(express.urlencoded({ extended: false }));



// Routes


  // For invalid routes. always  be the last in the server file (index.js)
  app.get('*', (req, res) => { 
    res.send('404! This is an invalid URL.');
  });
 
