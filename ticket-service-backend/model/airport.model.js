import { Sequelize } from 'sequelize'
import { db } from '../config/db.config.js'
export const Airport = db.define('airport', {
    iata_code: {
        type: Sequelize.STRING,
        primaryKey: true
    },
    airport_name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    city_name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    country_name: {
        type: Sequelize.STRING,
        allowNull: false
    },
}, {
    timestamps: false,
    freezeTableName: true,
})