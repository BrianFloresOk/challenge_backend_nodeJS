const express = require('express')
const app = express()
const path = require('path');
const process = require('process');
require('dotenv').config();
const PORT = process.env.PORT || 3500;
const methodOverride = require('method-override');

/* Enrutadores */
const apiRouter = require("./routes/charactersRoutes")

/* Middlewares de aplicación */
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(methodOverride('_method'));

/* Routes */
app.use('/api', apiRouter)

app.listen(PORT, () => console.log(`
Server listen port ${PORT}
http://localhost:${PORT}
`));