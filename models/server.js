const express = require('express')
const cors = require('cors')

class Server {
    constructor() {
        this.app = express()
        this.port = process.env.PORT
        this.usersRoutePath = '/api/users'

        //Middelwares
        this.middlewares()

        //rutas
        this.routes()
    }

    routes() {
        this.app.use(this.usersRoutePath, require('../routes/user'))
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log('Servidor corriendo en el puerto', this.port );
        })
    }

    middlewares() {
        //CORS
        this.app.use(cors())

        //Lectura y parseo del body
        this.app.use(express.json())

        //Directorio publico
        this.app.use(express.static('public'))
    }
}

module.exports = Server