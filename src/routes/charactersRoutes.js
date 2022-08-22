const express = require('express')
const router = express.Router()
/* Controllers */
const charactersController = require("../controllers/charactersController")
const usersControllers = require("../controllers/usersController")
const genresController = require("../controllers/genresController")
const moviesController = require("../controllers/moviesController")

/* Validations */
const userValidation = require("../validations/userValidations")

/* Middlewares */
const uploadFile = require('../middlewares/imageGenreMiddleware')

router.post('/users/register', userValidation, usersControllers.register)
/****** Character's routes ******/
/* GET - All characters */
router.get('/characters', charactersController.all)
/* GET - Character detail */
router.get('/characters/detail/:id', charactersController.characterDetail)
/* POST - Create character */
router.post('/characters/create', uploadFile.single('image'), charactersController.createCharacter)
/* PUT - Update character */
router.put('/characters/updated/:id', charactersController.updateCharacter)
/* DELETE - Delete character */
router.delete('/characters/delete/:id', charactersController.deleteCharacter)

/****** Movie's routes ******/
/* GET - All movies */
router.get('/movies', moviesController.list)
/* GET - Movie detail*/
router.get('/movies/detail/:id', moviesController.movieDetail)
/* POST - Movie create*/
router.post('/movies/uploaded', uploadFile.single('image'), moviesController.uploadedMovie)
/* PUT - Movie update */
router.put('/movies/updated/:id', uploadFile.single('image'), moviesController.updateMovie)
/* DELETE - Movie delete */
router.delete('/movies/delete/:id', moviesController.deleteMovie)


/****** Genre's routes *******/ 
/* GET - All genres*/
router.get('/genres', genresController.all)
/* POST - Genre create */
router.post('/genres/uploaded', uploadFile.single('image'), genresController.create)
/* POST - Genre edit */
router.put('/genres/updated/:id', uploadFile.single('image'), genresController.update)
/* DELETE - Genre delte */
router.delete('/genres/delete/:id', genresController.delete)



module.exports = router