import { User } from "../models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { BlacklistToken } from "../models/blacklistToken.model.js";
import { Caption } from "../models/caption.model.js";

const authUser = async (req, res, next) => {
    try {
        const token = req.cookies.token || req.headers.authorization?.split(" ")[1];
        if (!token) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.userId).select("-password");
        if (!user) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        const isBlacklisted = await BlacklistToken.findOne({ token: token });
        if (isBlacklisted) {
            return res.status(401).json({ message: "Unauthorized" });
        }


        req.user = user;
        return next();
    } catch (error) {
        return res.status(401).json({ message: "Unauthorized" });
    }
}

const authCaption = async (req, res, next) => {
    try {
        const token = req.cookies.token || req.headers.authorization?.split(" ")[1];
        if (!token) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const caption = await Caption.findById(decoded.userId).select("-password");
        if (!caption) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        const isBlacklisted = await BlacklistToken.findOne({ token: token });
        if (isBlacklisted) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        req.caption = caption;

        return next();
    } catch (error) {
        return res.status(401).json({ message: "Unauthorized" });
    }
}

export {
    authUser,
    authCaption
};