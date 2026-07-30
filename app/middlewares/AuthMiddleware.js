import { TokenDecode } from "../utility/tokenUtility.js";

export default function AuthMiddleware(req, res, next) {
    const token = req.headers.token;
    if (!token) {
        return res.status(401).json({status: "fail", message: "Authentication token is required",});
    }
    const decoded = TokenDecode(token);
    if (!decoded) {
        return res.status(401).json({status: "fail", message: "Invalid or expired token",});
    }
    const { email, user_id } = decoded;
    if (!email || !user_id) {
        return res.status(401).json({status: "fail", message: "Invalid token payload",});
    }

    // Keeping these in headers so existing controllers continue working.
    req.headers.email = email;
    req.headers.user_id = user_id;

    return next();
}