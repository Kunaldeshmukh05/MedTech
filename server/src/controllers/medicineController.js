const Medicine = require('../models/Medicine');

const getMedicines = async (req, res) => {
  try {
    const { search } = req.query;
    let query = {};
    if (search) query.name = { $regex: search, $options: 'i' };
    const medicines = await Medicine.find(query);
    res.json(medicines);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

const addMedicine = async (req, res) => {
  try {
    const medicine = new Medicine(req.body);
    await medicine.save();
    res.status(201).json({ message: 'Medicine added successfully', medicine });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

const updateStock = async (req, res) => {
  try {
    const { id } = req.params;
    const { stock } = req.body;
    const medicine = await Medicine.findByIdAndUpdate(id, { stock }, { new: true });
    if (!medicine) return res.status(404).json({ message: 'Medicine not found' });
    res.json({ message: 'Stock updated', medicine });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

module.exports = { getMedicines, addMedicine, updateStock };