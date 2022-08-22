const { Character, CharacterMovie } = require("../database/models")


module.exports = {
    all: (req, res) => {
         Character.findAll()
            .then(characters => {
                if(!characters) {
                    res.status(400).json({
                        meta: {
                            status: 400,
                            msg: "Missing characters"
                        }
                    })
                }
                res.status(200).json({
                    meta: {
                        status: 200,
                        msg: "Successfully uploaded",
                        total: characters.length,
                        url: "api/characters"
                    },
                    data: {
                        characters: characters,
                    }
                })
            })
            .catch((error) => res.status(400).send(error));
    },

    createCharacter: async (req, res) => {
            let { name, age, image, history, weigth, movies_id } = req.body
            try {
                let character = await Character.create({
                    name: name,
                    age: +age,
                    image: !image? "Image default" : image,
                    history: !history? "Once upon a time..." : history,
                    weigth: +weigth,
                    movies_id: movies_id
                })
                let movieCharacter = await CharacterMovie.create({
                    character_id: character.id,
                    movie_id: character.movies_id
                })

                res.status(200).json({
                    meta: {
                        status: 200,
                        msg: "Successfully created",
                        msg2: "The character " + character.name + " was created correctly",
                        url: "api/characters/create"
                    },
                    data: {
                        name: character.name,
                        image: character.image
                    }
                })

            } catch (error) {
                res.json(error)
            }
    },

    updateCharacter: async (req, res) => {
        let characterId = req.params.id
        let { name, age, history, weigth, movies_id } = req.body
        try {
            let characterToEdit = Character.findByPk(characterId)
            let characterEdited = Character.update({
                name,
                age,
                history,
                weigth,
                movies_id,
                image: req.file? req.file.filename : characterToEdit.image
            }, {
                where: {
                    id: characterId
                }
            })

            if(characterEdited) {
                res.status(200).json({
                    meta: {
                        status: 200,
                        msg: "Successfully updated",
                        msg2: "The character " + characterToEdit.name + " was updated correctly",
                        url: "api/characters/updated/" + characterId
                    }
                })
            } else {
                res.json({
                    msg: "Upss.. something wrong"
                })
            }
        } catch (error) {
            res.json(error)
        }
    },

    characterDetail: async (req, res) => {
        let characterId = req.params.id
        try {
            let character = await Character.findByPk(characterId, {
                include: [{association: "movies"}]
            })
            if(character) {
                res.status(200).json({
                    meta: {
                        status: 200,
                        msg: "Successfully loaded",
                        url: "api/characters/detail/" + characterId
                    },
                    data: {
                        character,
                        movies: character.movies
                    }
                })
            } else {
                res.json({
                    msg: "Upss.. something wrong"
                })
            }
        } catch (error) {
            res.json(error)
        }
    },

    deleteCharacter: async (req, res) => {
        try {
            let characterId = +req.params.id
            let characterToDelete = await Character.findByPk(characterId)
            let characterDelete = await Character.destroy({
                where: {
                    id: characterId
                }
            })

            if(characterDelete) {
                res.status(200).json({
                    meta: {
                        status: 200,
                        msg: "The character " + characterToDelete.title + " was eliminated"
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