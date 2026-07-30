import jwt from "jsonwebtoken";
import { JWT_EXPIRE_TIME, JWT_KEY } from "../config/config.js";

export const TokenEncode = (email, user_id) => {
    const payload = {email, user_id,};
    const options = {expiresIn: JWT_EXPIRE_TIME};
    return jwt.sign(payload, JWT_KEY, options);
};


export const TokenDecode = (token) => {
    if (!token) {return null;}

    try {
        return jwt.verify(token, JWT_KEY);
    } catch {
        return null;
    }
};