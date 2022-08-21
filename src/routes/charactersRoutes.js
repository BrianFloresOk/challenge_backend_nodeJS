const express = require('express')
const router = express.Router()
/* Controllers */
const charactersControlle = require("../controllers/charactersController")
const usersControllers = require("../controllers/usersController")
const genresController = require("../controllers/genresController")
const moviesController = require("../controllers/moviesController")

/* Validations */
const userValidation = require("../validations/userValidations")

/* Middlewares */
const uploadFile = require('../middlewares/imageGenreMiddleware')

router.post('/users/register', userValidation, usersControllers.register)
/* GET - All characters */
router.get('/characters', charactersControlle.all)
/* POST - Create character */
router.post('/characters/create', charactersControlle.createCharacter)

/****** Movie's routes ******/
/* GET - All movies */
router.get('/movies', moviesController.list)
/* GET - Movie detail*/
router.get('/movies/detail/:id', moviesController.movieDetail)
/* POST - Movie create*/
router.post('/movies/uploaded', moviesController.uploadedMovie)
/* PUT - Movie update */
router.put('/movies/updated/:id', moviesController.updateMovie)
/* DELETE - Movie delete */
router.delete('/movies/delete/:id', moviesController.deleteMovie)


/****** Genre's routes *******/ 
/* GET - All genres*/
router.get('/genres', genresController.all)
/* POST - Genre create */
router.post('/genres/uploaded', uploadFile.single('image'), genresController.create)
/* POST - Genre edit */
router.put('/genres/updated/:id', genresController.update)
/* DELETE - Genre delte */
router.delete('/genres/delete/:id', genresController.delete)




module.exports = router