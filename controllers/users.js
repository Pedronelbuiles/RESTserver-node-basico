const { response } = require('express')

const usersGet = (req, res = response) => {

    const { q, hace, cod } = req.query

    res.json({
        message: 'Hola Pedro. Eres el mejor. Desde el controlador',
        peticion:'GET',
        q,
        hace,
        cod
    })
}

const usersPost = (req, res = response) => {

    const { nombre, edad } = req.body

    res.status(201).json({
        message: `Hola ${nombre}. Eres el mejor. Desde el controlador`,
        peticion:'POST',
        nombre,
        edad
    })
}

const usersPut = (req, res = response) => {

    const { id } = req.params

    res.status(400).json({
        message: 'Hola Pedro. Eres el mejor. Desde el controlador',
        peticion:'PUT',
        id
    })
}

const usersPatch = (req, res = response) => {
    res.json({
        message: 'Hola Pedro. Eres el mejor. Desde el controlador',
        peticion:'PATCH'
    })
}

const usersDelete = (req, res = response) => {
    res.json({
        message: 'Hola Pedro. Eres el mejor. Desde el controlador',
        peticion:'DELETE'
    })
}

module.exports = {
    usersGet,
    usersPost,
    usersPut,
    usersPatch,
    usersDelete
}