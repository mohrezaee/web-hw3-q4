import { Sequelize } from 'sequelize'
import { db } from '../config/db.config.js'
export const Flight = db.define('flight', {
    flight_serial: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    flight_id: {
        type: Sequelize.STRING,
        allowNull: false
    },
    origin: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    destination: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    aircraft: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    departure_utc: {
        type: Sequelize.STRING,
        allowNull: false
    },
    duration: {
        type: Sequelize.STRING,
        allowNull: false
    },
    y_price: {
        type: Sequelize.STRING,
        allowNull: false
    },
    j_price: {
        type: Sequelize.STRING,
        allowNull: false
    },
    f_price: {
        type: Sequelize.STRING,
        allowNull: false
    }
}, {
    timestamps: false,
    freezeTableName: true,
})