const express = require("express");
const router = express.Router();

const {protect} = require('../middlewares/authMiddleware')
const carController = require('../controllers/carController')

router.post('/create',protect, carController.createCar);
router.get('/view',protect, carController.getAllCars);
router.get('/getById/:id',protect, carController.getCarById);
router.put('/update/:id', protect,carController.updateCar);
router.delete('/delete/:id', protect, carController.deleteCar);

module.exports = router;