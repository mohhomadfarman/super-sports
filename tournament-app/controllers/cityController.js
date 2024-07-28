// controllers/cityController.js
const City = require("../models/City");

exports.createCity = async (req, res) => {
  try {
    const city = new City(req.body);
    await city.save();
    res.status(201).send(city);
  } catch (error) {
    res.status(400).send(error);
  }
};

exports.getCities = async (req, res) => {
  try {
    const cities = await City.find();
    res.status(200).send(cities);
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.updateCity = async (req, res) => {
  try {
    const city = await City.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!city) return res.status(404).send("City not found");
    res.send(city);
  } catch (error) {
    res.status(400).send(error);
  }
};

exports.deleteCity = async (req, res) => {
  try {
    const city = await City.findByIdAndDelete(req.params.id);
    if (!city) return res.status(404).send("City not found");
    res.send(city);
  } catch (error) {
    res.status(500).send(error);
  }
};
