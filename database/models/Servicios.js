
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../db');

class Servicios extends Model {}
Servicios.init({
    nombreServicio: DataTypes.STRING,
    imagenServicio: DataTypes.STRING,
},{
    sequelize,
    modelName: "servicios"
});
module.exports = Servicios;