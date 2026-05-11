import { registerCaption } from "../services/caption.service.js";
import { Caption } from "../models/caption.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { BlacklistToken } from "../models/blacklistToken.model.js";
import { validationResult } from "express-validator";


const registerCaption = asyncHandler(async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, fullname, password, vehicle } = req.body;

    const existingCaption = await Caption.findOne({ email });
    if(existingCaption) {
        throw new ApiError(400, "Caption with this email already exists");
    }

    const hashedPassword = await Caption.hashPassword(password);
    const caption = await Caption.createCaption({
        firstname: fullname.firstname,
        lastname: fullname.lastname,
        email,
        password: hashedPassword,
        color: vehicle.color,
        plate: vehicle.plate,
        capacity: vehicle.capacity,
        vehicleType: vehicle.vehicleType
    });

    const token = await caption.generateAuthToken();
    res.status(201)
    .json(new ApiResponse(201, "Caption registered successfully", { caption, token }));
});

const loginCaption = asyncHandler(async (req, res) => {

        const { email, password } = req.body;
        if(!email || !password) {
            throw new ApiError(400, "Email and password are required");
        }

        const caption = await Caption.findOne({ email }).select("+password");
        if(!caption) {
            throw new ApiError(401, "Invalid email or password");
        }

        const isMatch = await Caption.comparePassword(password);
        if (!isMatch) {
            throw new ApiError(401, "Invalid caption credentials");
        }

        const token = await caption.generateAuthToken();
        res.status(200)
        .json(new ApiResponse(200, "Caption logged in successfully", { caption, token }));
});

const getCaptionProfile = asyncHandler(async (req, res) => {
    const caption = req.caption;
    res.status(200)
    .json(new ApiResponse(200, "Caption profile retrieved successfully", { caption }));
});

const logoutCaption = asyncHandler(async (req, res) => {

    const token = req.cookies.token || req.headers.authorization?.split(" ")[1];
    if (!token) {
        throw new ApiError(400, "No token provided");
    }

    await BlacklistToken.create({ token });

    res.clearCookie("token");
    res.status(200)
    .json(new ApiResponse(200, "Caption logged out successfully"));

});

export {
    registerCaption,
    loginCaption,
    logoutCaption
}
