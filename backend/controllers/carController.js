const Car = require("../models/car");

exports.createCar = async (req, res) => {
  try {
    const { title, description, tags, images, userId } = req.body;

    const newCar = new Car({ user: userId, title, description, tags, images });
    await newCar.save();

    res.status(201).json({ message: "Car created successfully", car: newCar });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error creating car", error: error.message });
  }
};

exports.getAllCars = async (req, res) => {
  try {
    const userId = req.body.userId;
    const cars = await Car.find({ user:userId }).sort({ createdAt: -1 });
    res.status(200).json({ message: "Cars retrieved successfully", cars });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error retrieving cars", error: error.message });
  }
};

exports.getCarById = async (req, res) => {
  const userId = req.body.userId;
  console.log("userId",userId)
  try {
    const car = await Car.findOne({ _id: req.params.id, user: userId });
    if (!car) {
      return res.status(404).json({ message: "Car not found" });
    }
    res.status(200).json({ message: "Car retrieved successfully", car });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error retrieving car", error: error.message });
  }
};

exports.updateCar = async (req, res) => {
  try {
    const { title, description, tags, images } = req.body;
    const userId = req.body.userId;
    const updatedCar = await Car.findOneAndUpdate(
      { _id: req.params.id, user: userId},
      { title, description, tags, images },
      { new: true, runValidators: true }
    );

    if (!updatedCar) {
      return res.status(404).json({ message: "Car not found or unauthorized" });
    }

    res
      .status(200)
      .json({ message: "Car updated successfully", car: updatedCar });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating car", error: error.message });
  }
};

exports.deleteCar = async (req, res) => {
  try {
    const userId = req.body.userId;
    const deletedCar = await Car.findOneAndDelete({
      _id: req.params.id,
      user: userId,
    });

    if (!deletedCar) {
      return res.status(404).json({ message: "Car not found or unauthorized" });
    }

    res.status(200).json({ message: "Car deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting car", error: error.message });
  }
};
