import { Sequelize } from 'sequelize'
import { db } from '../config/db.config.js'
export const AircraftType = db.define('aircraft_type', {
    type_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    manufacturer: {
        type: Sequelize.STRING,
        allowNull: false
    },
    model: {
        type: Sequelize.STRING,
        allowNull: false
    },
    series: {
        type: Sequelize.STRING,
        allowNull: false
    },
}, {
    timestamps: false,
    freezeTableName: true,
})