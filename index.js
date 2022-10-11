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
app.get('/home', (req, res) => { // new
    res.send('Homepage! Hello world.');
  });

app.get('/about', (req, res) => { // new
    res.send('About page. Nice.');
  });

  // Path parameter
app.get('/users/:name', (req, res)=> {
    res.send('Hello ' + req.params.name)
  })
// ********* Query parameters ****************
app.get("/queryparams", (req, res) => {
    res.send(
      "My query params are: " + req.query.class + " and " + req.query.cohort
    );
  });
  
  

app.get('/books/:bookId', (req, res) => { 
    res.send(req.params);
  });

  //put request
app.put("/about", (req, res) => {
  res.send("You have changed me");
});

app.post("/signup", (req, res) => {
  res.send("You have registered a user");
});

app.delete("/about", (req, res) => {
  res.send("You have deleted something");
});

// How to send files
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/homepage.html");
});

app.get("/register", (req, res) => {
  res.sendFile(__dirname + "/views/Patients-register.html");
});

app.post("/register", (req, res) => {
  console.log(req.body);
  res.redirect("/");
});

// Rendering pug file
app.get("/signup", (req, res) => {
  res.render('registration');
});

app.post("/signup", (req, res) => {
  console.log(req.body);
  res.redirect("/home");
});


  // For invalid routes. always  be the last in the server file (index.js)
  app.get('*', (req, res) => { 
    res.send('404! This is an invalid URL.');
  });
 
  // Bootstrapping Server always oon the last line
app.listen(3000, () => console.log('listening on port 3000'));


// app.method(path, handler)

// path
// /
// /about
// /register

// handler/ callback
// (req, res) => { // new
//     res.send('About pageXOffset. Nice.');
// }