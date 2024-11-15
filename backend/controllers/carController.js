const Car = require("../models/car");
// const cloudinary = require('../config/cloudinary');

exports.createCar = async (req, res) => {
  try {
    const { title, description, tags, userId } = req.body;

    const images = req.files.map((file) => file.path);
    const parsedTags = typeof tags === "string" ? JSON.parse(tags) : tags;

    const newCar = new Car({ user: userId, title, description, tags:parsedTags, images });
    await newCar.save();

    res.status(201).json({success:true, message: "Car created successfully", car: newCar });
  } catch (error) {
    res
      .status(500)
      .json({success:false, message: "Error creating car", error: error.message });
  }
};

exports.getAllCars = async (req, res) => {
  try {
    const userId = req.params.userId;
    const cars = await Car.find({ user:userId }).sort({ createdAt: -1 });
    res.status(200).json({ success:true,message: "Cars retrieved successfully", cars });
  } catch (error) {
    res
      .status(500)
      .json({success:false, message: "Error retrieving cars", error: error.message });
  }
};

exports.getCarById = async (req, res) => {
  // // const userId = req.body.userId;, user: userId
  try {
    const car = await Car.findOne({ _id: req.params.id });
    if (!car) {
      return res.status(404).json({success:false, message: "Car not found" });
    }
    res.status(200).json({success:true, message: "Car retrieved successfully", car });
  } catch (error) {
    res
      .status(500)
      .json({success:false, message: "Error retrieving car", error: error.message });
  }
};

exports.updateCar = async (req, res) => {
  try {
    const { title, description, tags, existingImages } = req.body;

    // Parse existingImages and tags if they are strings
    const parsedExistingImages = typeof existingImages === "string" ? JSON.parse(existingImages) : existingImages || [];
    const parsedTags = typeof tags === "string" ? JSON.parse(tags) : tags;

    // Combine existing images with newly uploaded images
    const images = req.files.map((file) => file.path);
    const combinedImages = [...parsedExistingImages, ...images];

    const userId = req.body.userId;
    const updatedCar = await Car.findOneAndUpdate(
      { _id: req.params.id, user: userId },
      { title, description, tags: parsedTags, images: combinedImages },
      { new: true, runValidators: true }
    );

    if (!updatedCar) {
      return res.status(404).json({success:false, message: "Car not found or unauthorized" });
    }

    res
      .status(200)
      .json({ success:true,message: "Car updated successfully", car: updatedCar });
  } catch (error) {
    res
      .status(500)
      .json({success:false, message: "Error updating car", error: error.message });
  }
};

exports.deleteCar = async (req, res) => {
  try {
    // const userId = req.body.userId;
    const deletedCar = await Car.findOneAndDelete({
      _id: req.params.id,
      // user: userId,
    });

    if (!deletedCar) {
      return res.status(404).json({ success:false, message: "Car not found or unauthorized" });
    }

    res.status(200).json({ success:true,message: "Car deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ success:false,message: "Error deleting car", error: error.message });
  }
};
