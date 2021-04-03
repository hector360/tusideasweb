
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../db');

class ParrafosServicios extends Model {}
ParrafosServicios.init({
    texto: DataTypes.STRING,
    idServicio: DataTypes.INTEGER,
},{
    sequelize,
    modelName: "parrafosServicios"
});
module.exports = ParrafosServicios;