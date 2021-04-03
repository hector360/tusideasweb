const { Model, DataTypes } = require('sequelize');
const sequelize = require('../db');

class Mensajes extends Model {}
Mensajes.init({
    email: DataTypes.STRING,
    mensaje: DataTypes.STRING,
    sala: DataTypes.STRING,
    fechaCreacion: DataTypes.DATE,
    
},{
    sequelize,
    modelName: "mensajes"
});
module.exports = Mensajes;