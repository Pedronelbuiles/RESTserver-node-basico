const { response } = require("express");
const bcryptjs = require('bcryptjs')

const User = require('../models/usuario');
const { generarJWT } = require("../helpers/generar-jwt");

const login = async (req, res = response) => {

    const { email, password} = req.body

    try {
        //Verificar email
        const usuario = await User.findOne({ email })
        if (!usuario) {
            return res.status(400).json({
                message: 'Usuario / contraseña incorrecto -- correo'
            })
        }
        //Verificar usuario activo
        if (!usuario.status) {
            return res.status(400).json({
                message: 'Usuario / contraseña incorrecto -- estado: false'
            })
        }
        //Verificar contraseña
        const validPassword = bcryptjs.compareSync(password, usuario.password)
        if (!validPassword) {
            return res.status(400).json({
                message: 'Usuario / contraseña incorrecto -- password'
            })
        }

        //Generar JWT
        const token = await generarJWT(usuario.id)

        res.json({usuario, token})
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message: 'Hable con el administrador'
        })
    }
}

module.exports = {
    login
}