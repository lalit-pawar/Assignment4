const { rocketDtype } = require("../common/config");
const container = require("./cosmosConfig");

const saveDataToContainer = async (rocket) => {
  try {
    const { resource: savedItem } = await container.items.create(rocket);
    console.log(`Item saved with ID: ${savedItem.id}`);
    return savedItem;
  } catch (error) {
    console.error("Error saving data to container:", error.message);
    throw error;
  }
};

// Modified getAllDataFromContainer function
const getAllDataFromContainer = async ( dType, pageNo = 1, pageSize = 100) => {
  try {
    const querySpec = {
      query: "SELECT * FROM c WHERE c.active = true AND c.archived = false",
      parameters: [
        { name: '@dType', value: rocketDtype }
      ],
      requestOptions: { pageSize: pageSize },
    };
    const skipCount = (pageNo - 1) * pageSize;
    const { resources: rockets } = await container.items
      .query(querySpec)
      .fetchAll();
    const currentPageRockets = rockets.slice(skipCount, skipCount + pageSize);

    return { rockets: currentPageRockets };
  } catch (error) {
    console.error("Error fetching data from container:", error.message);
    throw error;
  }
};

module.exports = {
  saveDataToContainer,
  getAllDataFromContainer,
};
