import { Airport } from "../model/airport.model.js";


export async function getAirports() {
    try {
        const airports = await Airport.findAll()
        return airports
    } catch (error) {
        console.log(error)
    }
}
