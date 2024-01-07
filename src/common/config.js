require("dotenv").config();

module.exports = {
  cosmosDb: {
    endpoint: process.env.COSMOSDB_ENDPOINT,

    key: process.env.COSMOSDB_KEY,
    dbName: process.env.COSMOSDB_DBNAME,
    containerName: process.env.COSMOSDB_CONTAINERNAME,
   
  },

  rocketDtype : "rockets",
  URL : "https://api.spacexdata.com/v3/rockets"
  

};





