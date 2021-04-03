const { Model, DataTypes } = require('sequelize');
const sequelize = require('../db');

class SalasChat extends Model {}
SalasChat.init({
    sala: DataTypes.STRING,
    idAdministrador: DataTypes.INTEGER,
    usuario: DataTypes.STRING,
},{
    sequelize,
    modelName: "salaschat"
});
module.exports = SalasChat;