const db = require("../database/models");
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
}