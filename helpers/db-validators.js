const Role = require('../models/role')
const User = require('../models/usuario')

const esRoleValido = async (role = '') => {
    const exiteRol = await Role.findOne({role})
    if(!exiteRol){
            throw new Error(`El role ${role} no está registrado en la Base de Datos`)
    }
}

const emailExiste = async (email = '') => {
    //verificar si el correo existe
    const existeEmail = await User.findOne({email})
    if (existeEmail) {
        throw new Error(`El correo: ${email}, ya existe`)
    }
}

const userPorIdExiste = async (id) => {
    //verificar si el correo existe
    const existeUser = await User.findById(id)
    if (!existeUser) {
        throw new Error(`El id: ${id}, no existe`)
    }
}

module.exports = {
    esRoleValido,
    emailExiste,
    userPorIdExiste
}