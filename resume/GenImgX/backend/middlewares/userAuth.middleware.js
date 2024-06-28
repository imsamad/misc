
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv';
dotenv.config();

export function validUser(req, res, next) {
    const header = req.headers.authorization
    if (!header) {
        res.status(403).json({ msg: "Not authorizated" })
        return
    }
    try {
        const jwtDecoded = jwt.verify(header, process.env.JWT_SECRET)
        req.userId = jwtDecoded.userId
        next()
    } catch (error) {
        res.status(403).json({ msg: "Not authorizated" })
        return
    }

}