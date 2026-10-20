const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware')
const { getUnits, addUnit,updateUnit, deleteUnit } = require('../controllers/unitController')

router.get('/', protect, getUnits)

router.post('/', protect ,addUnit)

router.put('/:id', protect ,updateUnit)

router.delete('/:id', protect ,deleteUnit)


module.exports = router