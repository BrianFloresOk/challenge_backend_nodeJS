const db = require("../database/models");
const { Character } = require("../database/models")


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

    createCharacter: (req, res) => {
        const { name, age, image, history, weigth, movies_id } = req.body;
        
        Character.create({
            name: name,
            age: +age,
            image: !image? "Image default" : image,
            history: !history? "Once upon a time..." : history,
            weigth: +weigth,
            movies_id: movies_id
        })
            .then(character => {
                res.status(200).json({
                    meta: {
                        status: 200,
                        msg: "Successfully created",
                        url: "api/characters/create"
                    },
                    data: {
                        name: character.name,
                        image: character.image
                    }
                })
            })
            .catch((error) => res.status(400).send(error));
    }
}