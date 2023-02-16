import { Sequelize } from 'sequelize'
import { db } from '../config/db.config.js'
export const City = db.define('city', {
    country_name: {
        type: Sequelize.STRING,
        primaryKey: true,
    },
    city_name: {
        type: Sequelize.STRING,
        primaryKey: true,
    },
    timezone_name: {
        type: Sequelize.STRING,
        allowNull: false
    },
}, {
    timestamps: false,
    freezeTableName: true
})