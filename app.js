// Port compatibility.
const express = require ('express')  //importing eppress
const app = express(); // giving all power of express to app
const port = 8080; // setting up port.
const router = require ("./src/Routes/rocketRoutes");


// Midlleware for parsing json
app.use(express.json());


app.get("/" ,(req,res)=>{

      res.send("Hello from SpacexRockets" );
})



//TO post the data into the comsmosdb Emulator
app.use("/Rockets" , router);



//Listening to port.
app.listen(port , ()=>{
     
     console.log(` App is running on port ${port} `);
});

