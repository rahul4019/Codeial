const express = require('express');
const router = express.Router();

const dummyController = require('../controllers/dummy_controller');

router.get('/dummy',dummyController.dummy);

module.exports = router;