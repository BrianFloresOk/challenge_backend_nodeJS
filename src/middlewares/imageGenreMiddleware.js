const multer = require('multer')
const path = require('path')

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '../../public/images/genres'))
    },
    filename: (req, file, cb) => {
        let newFile = `${Date.now()}-genre-${path.extname(file.originalname)}`;
        cb(null, newFile)
    }
})

const upload = multer({storage})

module.exports = upload