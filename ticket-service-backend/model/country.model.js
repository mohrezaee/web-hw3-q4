import { Sequelize } from 'sequelize'
import { db } from '../config/db.config.js'
export const Country = db.define('country', {
    country_name: {
        type: Sequelize.STRING,
        primaryKey: true,
    },
}, {
    timestamps: false,
    freezeTableName: true
})