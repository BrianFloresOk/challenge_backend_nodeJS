const { check, body } = require("express-validator")
const { User } = require("../database/models")

module.exports = [
    check("email")
        .notEmpty().withMessage("Debe ingresar un email").bail()
        .isEmail().withMessage("Ingrese un email válido"),
    body("email").custom((value)=>{
        return User.findOne( {where:{email: value}} )
        .then((user) => {
            if(user){
                return Promise.reject("Email ya registrado")
            }
        })
    }),
    check("password")
    .notEmpty().withMessage('Ingrese una contraseña')
    .isLength({min:8, max:12}).withMessage('La contraseña debe tener al menos 8 caracteres'),
]