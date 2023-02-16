import { Sequelize } from 'sequelize'
import { db } from '../config/db.config.js'
export const Purchase = db.define('purchase', {
    // id: {
    //     type: Sequelize.INTEGER,
    //     primaryKey: true,
    //     autoIncrement: true,
    // },
    corresponding_user_id: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    title: {
        type: Sequelize.STRING,
        allowNull: false
    },
    pre_id: {
        type: Sequelize.STRING,
        allowNull: false
    },
    first_name: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    last_name: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    flight_serial: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    offer_price: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    offer_class: {
        type: Sequelize.STRING,
        allowNull: false
    },
    transaction_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
    },
    transaction_result: {
        type: Sequelize.INTEGER,
        allowNull: true
    },
}, {
    timestamps: false,
    freezeTableName: true,
})