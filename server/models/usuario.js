const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');


let validarRol = {
    values: ['ADMIN_ROLE', 'USER_ROLE'],
    message: '{VALUE} no es valido'
};

let Schema = mongoose.Schema;

let usuarioSchema = new Schema({
    nombre: {
        type: String,
        required: [true, 'Es necesario ingresar el nombre']
    },
    email: {
        type: String,
        unique: true,
        required: [true, 'Es necesario ingresar el correo']
    },
    password: {
        type: String,
        required: [true, 'Es necesario ingresar una contraseña']
    },
    img: {
        type: String,
        required: false
    },
    role: {
        type: String,
        default: 'USER_ROLE',
        enum: validarRol
    },
    estado: {
        type: Boolean,
        default: true
    },
    google: {
        type: Boolean,
        default: false
    }
});

usuarioSchema.methods.toJSON = function() {
    let user = this;
    let userObject = user.toObject();
    delete userObject.password;

    return userObject;
};

usuarioSchema.plugin(uniqueValidator, { message: 'El {PATH} ya esta registrado' });

module.exports = mongoose.model('Usuario', usuarioSchema);