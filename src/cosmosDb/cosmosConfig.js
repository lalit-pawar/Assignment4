process.env.NODE_TLS_REJECT_UNAUTHORIZED = 0
const { CosmosClient } = require("@azure/cosmos");
const config = require("../common/config");

console.log("Endpoint:", config.cosmosDb.endpoint);
console.log("Key:", config.cosmosDb.key);

try { 
  const client = new CosmosClient({
    endpoint: config.cosmosDb.endpoint,
    key: config.cosmosDb.key,
    allowInsecureConnection: true,
  });

  console.log("Cosmos DB client initialized successfully.");

  const database = client.database(config.cosmosDb.dbName);
  const container = database.container(config.cosmosDb.containerName);

  console.log("Connected to Cosmos DB emulator:");
  
  module.exports = container;
  
} catch (error) {
  console.error("Error initializing Cosmos DB client:", error.message);
  throw error;
};