import { Sequelize } from "sequelize";
import { Offer } from "../model/offer.model.js";


export async function createOffer(data) {
    const offer = new Offer(data)
    return await offer.save()
}

export async function getOffer(filter) {
    let origin = filter.origin
    let destination = filter.destination
    let departure = new Date(filter.departure_local_time)
    let departure_tomarrow = new Date(filter.departure_local_time)
    departure_tomarrow.setDate(departure_tomarrow.getDate() + 1)

    const response = await Offer.findAll({
        where: {
            origin,
            destination,
            departure_local_time: {
                [Sequelize.Op.between]: [departure, departure_tomarrow]
            }
        }
    });
    return response
}
