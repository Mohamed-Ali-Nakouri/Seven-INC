const express = require('express');
const router = express.Router();
const multer  = require('multer');
const destination = multer({ dest: './api/resources/uploads/' });

const employeeController = require('../controllers/employeeController');


router.get('/employee', employeeController.getAll);
router.get('/employee/:id',employeeController.getOne);
router.post('/employee',employeeController.create);
router.patch('/employee/:id',employeeController.update);
router.delete('/employee/:id',employeeController.delete);

module.exports = router;