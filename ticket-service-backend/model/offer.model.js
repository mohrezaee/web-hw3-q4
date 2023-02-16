import { Sequelize } from 'sequelize'
import { db } from '../config/db.config.js'
export const Offer = db.define('available_offers', {
    flight_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    origin: {
        type: Sequelize.STRING,
        allowNull: false
    },
    destination: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    departure_local_time: {
        type: Sequelize.STRING,
        allowNull: false
    },
    arrival_local_time: {
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
    },
    y_class_free_capacity:{
        type: Sequelize.STRING,
        allowNull: false
    },
    j_class_free_capacity:{
        type: Sequelize.STRING,
        allowNull: false
    },
    f_class_free_capacity:{
        type: Sequelize.STRING,
        allowNull: false
    },
    equipment:{
        type: Sequelize.STRING,
        allowNull: false
    },
}, {
    timestamps: false
})