const rocketService = require("../Services/rocketServices");
const Rocket = require("../models/rocket");
const config = require("../common/config");
const { default: axios } = require("axios");
const url = config.URL;

// To get All data from the given Spacex Rocket Api using Axios Function.
const getRockets = async (req, res) => {
  try {
    axios.get(url).then((response) => {
      const data = response.data;

      res.json(data[0]);
      console.log(data);
    });
  } catch (error) {
    console.error(error.message);
    throw error;
  }
};

//Function to get the data by Id
const getRocketById = async (req, res) => {
  try {
    if (!req.params || !req.params.rocketId) {
      return res
        .status(400)
        .json({ error: "Invalid request. Missing rocketId parameter." });
    }

    const rocketId = req.params.rocketId;
    const spacexApiUrl = `${url}/${rocketId}`;

    const response = await axios.get(spacexApiUrl);

    // Log the entire API response for debugging
    console.log("SpaceX API Response:", response.data);

    if (!response.data) {
      return res.status(404).json({ error: "Rocket not found." });
    }

    // Send the data from the SpaceX API in the response
    res.json(response.data);
  } catch (error) {
    console.error(error.message);

    if (res && res.status) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
};

//function TO add Rocket to database
const addRocketbyID = async (req, res) => {
  try {
    if (!req.params || !req.params.rocket_id) {
      return res
        .status(400)
        .json({ error: "Invalid request. Missing rocket_id parameter." });
    }

    const rocketId = req.params.rocket_id;

    // Corrected line: Pass rocketId to getRocketById function
    const spacexApiUrl = `${url}/${rocketId}`;

    const response = await axios.get(spacexApiUrl);

    const jsondata = response.data;

    const rocket = new Rocket(jsondata);

    const result = await rocketService.addRocket(rocket);

    res.status(200).json({ message: "Rocket added ", result: result });
  } catch (error) {
    console.error(error.message);

    // Adjust the response based on your needs
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getRocket = async (req, res) => {
  try {
    const result = await rocketService.getAllRockets(req.body);
    res.status(200).json({ result });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getRockets,
  getRocketById,
  addRocketbyID,
  getRocket,
};
