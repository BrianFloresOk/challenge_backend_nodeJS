const { Genre } = require("../database/models")

module.exports = {
    all: async (req, res) => {
        try {
            let genres = await Genre.findAll()
            if(genres.length !== 0) {
                res.status(200).json({
                    meta: {
                        status: 200,
                        msg: "Successfully loaded",
                        total: genres.length
                    },
                    data: {
                        genres
                    }
                })
            } else {
                res.json({
                    msg: "There is no gender available",
                    total: genres.length
                })
            }
        } catch (error) {
            res.json(error)
        }
    },

    create: (req, res) => {
        Genre.create({
            name: req.body.name,
            image: req.file ? req.file.filename : "No image available"
        })
        .then(genre => {
            if(genre) {
                res.status(200).json({
                    meta: {
                        status: 200,
                        msg: "Successfully loaded",
                        msg2: "The genre " + genre.name + " was created correctly",
                        url: "api/genres/uploaded"
                    },
                    data: {
                        genre: genre
                    }
                })
            } else {
                res.json({
                    status: 400,
                    msgError: "Upss.. something went wrong"
                })
            }
        })
        .catch(error => {
            res.json(error)
        })
    },

    update: async (req, res) => {
        try {
            let genreId = +req.params.id
            let genreEdit = await Genre.findByPk(genreId)
            let genreUpdate = await Genre.update({
                name: req.body.name,
                image: req.file? req.file.filename : genreEdit.image
            }, {
                where: {
                    id: genreId
                }
            })

            if(genreUpdate) {
                let genreEdited = await Genre.findByPk(genreId)
                res.status(200).json({
                    meta: {
                        status: 200,
                        msg: "Successfully loaded",
                        msg2: "The " + genreEdit.name +" genre has been updated to " + genreEdited.name,
                        url: "api/genres/updated/" + genreId
                    },
                    data: {
                        genre: genreEdited
                    }
                })
            } else {
                res.json({
                    status: 400,
                    msgError: "Upss.. something went wrong"
                })
            }
            
        } catch (error) {
            res.json({error})
        }
    },

    delete: async (req, res) => {
        try {
            let genreId = +req.params.id
            let genderToDelete = await Genre.findByPk(genreId)
            let genreDelete = await Genre.destroy({
                where: {
                    id: genreId
                }
            })

            if(genreDelete) {
                res.status(200).json({
                    meta: {
                        status: 200,
                        msg: "The " + genderToDelete.name + " genre was eliminated"
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