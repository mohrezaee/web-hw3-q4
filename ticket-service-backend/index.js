import express from 'express';
import dotenv from 'dotenv'
import { connectDB } from './config/db.config.js';
import { getOffer } from './service/offer.service.js';
import bodyParser from 'body-parser';
import { createPurchase, getPurchases, updateTransactionResult } from './service/purchase.service.js';
import { auth } from './middleware/auth.js';
import { getAirports } from './service/airport.service.js';
dotenv.config()

const app = express();
const port = process.env.PORT || 3000;
app.use(bodyParser.json())

app.post('/offers', async (req, res) => {
    try {
        res.status(200).json(await getOffer(req.body))
    } catch (error) {
        res.status(500).send('internal server error')
    }
});

app.get('/airports', async (req, res) => {
    try {
        res.status(200).json(await getAirports())
    } catch (error) {
        res.status(500).send('internal server error')
    }
});

app.post('/purchase',auth, async (req, res) => {
    try {
        res.status(200).json(await createPurchase(req.body))
    } catch (error) {
        res.status(500).send('internal server error')
    }
})

app.get('/purchase/:title/:result', async (req, res) => {
    try {
        const { title, result } = req.params
        res.status(200).json(await updateTransactionResult({ title, result }))
    } catch (error) {
        res.status(500).send('internal server error')
    }
})
app.get('/purchases/:user_id',auth, async (req, res) => {
    try {
        const {user_id} = req.params
        res.status(200).json(await getPurchases(user_id))
    } catch (error) {
        res.status(500).send('internal server error')
    }
})

app.listen(port, () => {
    console.log(`Server listening on the port  ${port}`);
})

function init() {
    connectDB()
}

init()