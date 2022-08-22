const { Movie, CharacterMovie, Character } = require('../database/models')

module.exports = {
    list: async (req, res) => {
        try {
            let movies = await Movie.findAll()
            if(movies) {
                let allMovies = {}
                movies.forEach(movie => {
                  allMovies.title = movie.title,
                  allMovies.image = movie.image,
                  allMovies.createdAt = movie.created_at  
                })
                res.status(200).json({
                    meta: {
                        status: 200,
                        msg: "Successfully loaded",
                        url: "api/movies",
                        total: movies.length
                    },
                    data: {
                        allMovies
                    }
                })
            } else {
                res.json({
                    status: 400,
                    msg: "Upss.. something wrong"
                })
            }
        } catch (error) {
            res.json(error)
        }

    },

    movieDetail: async (req, res) => {
        try {
            let movieId = +req.params.id
            let movie = await Movie.findByPk(movieId, {
                include: [
                    {association: "characters"},
                    {association: "movies"}
                ]
            })
            let characters = await Character.findAll()
            let charactersMovie = await CharacterMovie.findAll({
                where: {
                    movie_id: movieId
                },
            })
            if(movie) {
                res.status(200).json({
                    meta: {
                        status: 200,
                        msg: "Successfully loaded",
                        url: "api/movies/detail/" + movieId
                    },
                    data: {
                        movie,
                        characters: charactersMovie 
                    }
                })
            }
/*             let moviesId = req.params.id
            let characters = await CharacterMovie.findAll({
                where: {
                    movie_id: moviesId
                },
                include: ["characters", "movies"]
            })
            res.json({
                data: {
                    characters 
                }
            }) */
        } catch (error) {
            res.json(error)
        }
    },

    uploadedMovie: async (req, res) => {
        try {
            let { title, qualification, genre_id } = req.body
            let movieCreated = await Movie.create({
                title,
                qualification,
                genre_id,
                image: req.file? req.file.filename : "No image"
            })
            if(movieCreated) {
                res.status(200).json({
                    meta: {
                        status: 200,
                        msg: "Successfully loaded",
                        msg2: "The movie " + movieCreated.title + " was created correctly",
                        url: "api/movies/uploaded"
                    },
                    data: {
                        movieCreated
                    }
                })
            } else {
                res.json({
                    status: 400,
                    msgError: "Upss.. something wrong"
                })
            }
        } catch (error) {
            res.json(error)
        }
    },

    updateMovie: async (req, res) => {
        let movieId = +req.params.id
        try {
            let movieEdit = await Movie.findByPk(movieId)
            let { title, qualification, genre_id } = req.body
            let movieUpdate = await Movie.update({
                title,
                qualification,
                genre_id,
                image: req.file? req.file.filename : movieEdit.image
            }, {
                where: {
                    id: movieId
                }
            })

            if(movieUpdate) {
                let movieEdited = await Movie.findByPk(movieId)
                res.status(200).json({
                    meta: {
                        status: 200,
                        msg: "Successfully loaded",
                        msg2: "The movie " + movieEdited.title +" has been updated",
                        url: "api/movies/updated/" + movieId
                    },
                    data: {
                        movieEdited
                    }
                })
            } else {
                res.json({
                    status: 400,
                    msgError: "Upss.. something went wrong"
                })
            }
        } catch (error) {
            res.json(error)
        }
    },
    
    deleteMovie: async (req, res) => {
        try {
            let movieId = +req.params.id
            let movieToDelete = await Movie.findByPk(movieId)
            let movieDelete = await Movie.destroy({
                where: {
                    id: movieId
                }
            })

            if(movieDelete) {
                res.status(200).json({
                    meta: {
                        status: 200,
                        msg: "The movie " + movieToDelete.title + " was eliminated"
                    }
                })
            } else {
                res.json({
                    msgError: "Upss.. something wrong"
                })
            }
        } catch (error) {
            res.json(error)
        }
    }
}