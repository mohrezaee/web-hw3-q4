import axios from "axios";
import FormData from "form-data";
import { Purchase } from "../model/purchase.model.js";

function makeid(length) {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
        counter += 1;
    }
    return result;
}

export async function createPurchase(purchase) {
    try {

        purchase.pre_id = makeid(20)
        var bodyFormData = new FormData();
        bodyFormData.append('amount', purchase.offer_price);
        bodyFormData.append('receipt_id', 86765674654654);
        bodyFormData.append('callback', `http://localhost:3000/purchase/${purchase.pre_id}`);

        const response = await axios.post(`${process.env.BANK_HOST || "http://localhost:8000"}/transaction/`, bodyFormData, {
            headers: { "Content-Type": "multipart/form-data" }
        })
        console.log(response.data)
        const time = response.data.time_create
        const create = await Purchase.create({
            ...purchase, transaction_id: response.data.id,
            transaction_result: response.data.result
        })

        return create
    } catch (error) {
        console.log(error)
    }
}

export async function updateTransactionResult(data) {
    try {
        const { title, result } = data
        const updated = await Purchase.update({ 'transaction_result': result }, { where: { pre_id: title } })

        return updated
    } catch (error) {
        console.log(error)
    }

}

export async function getPurchases(corresponding_user_id) {
    try {
        const purchases = await Purchase.findAll({
            where: {
                corresponding_user_id
            }
        })
        return purchases
    } catch (error) {
        console.log(error)
    }

}