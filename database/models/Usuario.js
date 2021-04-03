const { Model, DataTypes } = require('sequelize');
const sequelize = require('../db');

class Usuario extends Model {}
Usuario.init({
    email: DataTypes.STRING,
    nombre: DataTypes.STRING,
    password: DataTypes.STRING,
    idTipoUsuario: DataTypes.INTEGER
},{
    sequelize,
    modelName: "usuario"
});
module.exports = Usuario;