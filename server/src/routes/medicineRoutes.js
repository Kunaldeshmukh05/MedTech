const express = require('express');
const router = express.Router();
const { getMedicines, addMedicine, updateStock } = require('../controllers/medicineController');

router.get('/', getMedicines);
router.post('/', addMedicine);
router.put('/:id/stock', updateStock);

module.exports = router;