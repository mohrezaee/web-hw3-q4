import axios from "axios";

export async function auth(req, res, next) {
    try {
        const auth = req.headers.authorization
        const authHost = process.env.GO_AUTH_HOST
        const response = await axios.get(authHost + "/user", {
            headers: {
                "Authorization": auth
            }
        })
        console.log(response)
        if(response.data?.data?.User_id !== undefined) {
            next()
        } else {
            res.status(401).send('unauthorized')
        }
    } catch (error) {
        console.log(error)
        res.status(401).send('unauthorized')
    }
}