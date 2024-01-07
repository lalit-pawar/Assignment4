const cosmosDbService = require("../cosmosDb/cosmosDbService");
const config = require("../common/config");

const addRocket = async (rocket) => {
  rocket.initialize(true, config.rocketDtype, "", "admin");
  const result = await cosmosDbService.saveDataToContainer(rocket);
  return result;
};

const getAllRockets = async ({  pageNo = 1, pageSize = 10 }) => {
  try {
    const result = await cosmosDbService.getAllDataFromContainer(
       config.rocketDtype,
      pageNo,
      pageSize
    );
    return result.rockets;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  addRocket,
  getAllRockets,
};

