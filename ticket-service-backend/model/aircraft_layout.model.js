import { Sequelize } from 'sequelize'
import { db } from '../config/db.config.js'
export const AircraftLayout = db.define('aircraft_layout', {
    layout_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    type_id: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    y_class_capacity: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    j_class_capacity: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    f_class_capacity: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
}, {
    timestamps: false,
    freezeTableName: true,
})