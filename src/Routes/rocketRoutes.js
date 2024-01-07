const express = require ('express');
const router = express.Router();
const rocketController  = require('../controllers/rocketController');



router.get('/test', async (req, res)=>{

        res.send("this is from test");
});


// To get the Data from the given Spacex API 
router.get("/Rocket", rocketController.getRockets );

// TO get the rocket from the Spacex ApI by using ID.
router.get("/RocketbyId/:rocketId", rocketController .getRocketById);

// To post the data into the cosmosdb Database one-by-one using ID.
router.post("/addRocket/:rocket_id", rocketController .addRocketbyID);


// TO get all data from the CosmosDb database.
router.get("/rocketall" , rocketController .getRocket);





module.exports =router;