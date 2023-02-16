import { Sequelize } from 'sequelize'
export const db = new Sequelize(
    process.env.DB_DATABASE,
    process.env.DB_USER,
    process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    dialect: 'postgres',
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
});



export async function connectDB() {
    try {
        await db.authenticate()
    } catch (error) {
        console.error(error)
        process.exit(1)
    }
}
