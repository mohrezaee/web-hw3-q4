import { Sequelize } from 'sequelize'
import { db } from '../config/db.config.js'
export const Aircraft = db.define('aircraft', {
    registration: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    layout_id: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
}, {
    timestamps: false,
    freezeTableName: true
})