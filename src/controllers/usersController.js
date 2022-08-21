const { User } = require('../database/models')
const bcrypt = require('bcryptjs')

module.exports = {
    register: (req, res) => {
        User.create({
            email: req.body.email,
            password: bcrypt.hashSync(req.body.password, 10)
        })
        .then(user => {
            res.status(200).json({
                meta: {
                    status: 200,
                    msg: "User sussesfully created",
                    msg2: "Usuario " + user.email + " registrado",
                    url: "api/users/register"
                },
                data: {
                }
            })
        })
        .catch(error => {
            res.status(400).json({
                meta: {
                    status: 400,
                    msg: "Upss.. something went wrong"
                },
                data: {
                    error
                }
            })
        })
    }
}