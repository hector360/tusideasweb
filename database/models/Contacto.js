
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../db');

class Contacto extends Model {}
Contacto.init({
    nombrescontacto: DataTypes.STRING,
    correo: DataTypes.STRING,
    telefono: DataTypes.STRING,
    mensaje: DataTypes.STRING
},{
    sequelize,
    modelName: "contacto"
});
module.exports = Contacto;

