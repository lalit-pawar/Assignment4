const { app } = require('@azure/functions');
const { CosmosClient } = require("@azure/cosmos");

const client = new CosmosClient({
    endpoint: 'https://localhost:8081',
    key: 'C2y6yDjf5/R+ob0N8A7Cgv30VRDJIWEHLM+4QDU5DE2nQ9nDuVTqobD4b8mGGyPMbIZnqyMsEcaGQy67XIw/Jw==',

    connectionPolicy: {
        retryOptions: {
            maxRetryAttemptsOnThrottledRequests: 10,
            maxRetryWaitTimeInSeconds: 60,
        },
    },
});

app.timer('MyTimerTrigger', {
    schedule: '0 */5 * * * *',
    handler: async (myTimer, context) => {
        const timeStamp = new Date().toISOString();

        if (myTimer.isPastDue) {
            context.log('JavaScript is running late!');
        }

        context.log('Timer function processed request!', timeStamp);

        try {
            // Your logic to fetch data from SpaceX API
            const spaceXData = await fetchDataFromSpaceXAPI();

            // Your logic to add data to Cosmos DB
            await addDataToCosmosDB(spaceXData);

            context.log('Data added to Cosmos DB successfully.');
        } catch (error) {
            context.log.error('Error processing timer trigger:', error.message);
        }
    }
});

async function fetchDataFromSpaceXAPI() {
    // Implement logic to fetch data from SpaceX API
    // ...

    // For example:
    const response = await fetch('https://api.spacexdata.com/v4/rockets');
    const data = await response.json();
    return data;
}

async function addDataToCosmosDB(spaceXData) {
    // Implement logic to add data to Cosmos DB
    // ...

    // For example:
     const databaseId = 'Spacex_Rockets';
     const containerId = 'Rocket_data';

const database = client.database(databaseId);
const container = database.container(containerId);

await container.items.create(spaceXData);
}
