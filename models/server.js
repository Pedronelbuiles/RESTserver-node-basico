const express = require('express')
const cors = require('cors')
const fileUpload = require('express-fileupload')  

const { dbConnection } = require('../database/config')

class Server {
    constructor() {
        this.app = express()
        this.port = process.env.PORT

        this.paths = {
            auth: '/api/auth',
            buscar: '/api/buscar',
            categorias: '/api/categorias',
            productos: '/api/productos',
            usersRoutePath: '/api/users',
            upload: '/api/upload'
        }

        //Conectar a la base de datos
        this.conectarDb()

        //Middelwares
        this.middlewares()

        //rutas
        this.routes()
    }

    routes() {
        this.app.use(this.paths.auth, require('../routes/auth'))
        this.app.use(this.paths.buscar, require('../routes/buscar'))
        this.app.use(this.paths.categorias, require('../routes/categorias'))
        this.app.use(this.paths.productos, require('../routes/productos'))
        this.app.use(this.paths.usersRoutePath, require('../routes/user'))
        this.app.use(this.paths.upload, require('../routes/upload'))
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log(`Servidor corriendo en el puerto ${this.port}`.green);
        })
    }

    async conectarDb() {
        await dbConnection()
    }

    middlewares() {
        //CORS
        this.app.use(cors())

        //Lectura y parseo del body
        this.app.use(express.json())

        //Directorio publico
        this.app.use(express.static('public'))

        //FileUpload - carga de archivos
        this.app.use(fileUpload({
            useTempFiles: true,
            tempFileDir: '/tmp/',
            createParentPath: true
        }))
    }
}

module.exports = Server