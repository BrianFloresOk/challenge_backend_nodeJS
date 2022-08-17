const express = require('express')
const router = express.Router()
/* Controllers */


/* GET - All characters */
router.get('/characters', charactersController.all)


module.exports = router