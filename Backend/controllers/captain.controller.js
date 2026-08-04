import { registerCaption } from "../services/captain.service.js";
import { Captain } from "../models/captain.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { BlacklistToken } from "../models/blacklistToken.model.js";
import { validationResult } from "express-validator";


const registerCaptain = asyncHandler(async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, fullname, password, vehicle } = req.body;

    const existingCaptain = await Captain.findOne({ email });
    if(existingCaptain) {
        throw new ApiError(400, "Captain with this email already exists");
    }

    const hashedPassword = await Captain.hashPassword(password);
    const captain = await Captain.createCaptain({
        firstname: fullname.firstname,
        lastname: fullname.lastname,
        email,
        password: hashedPassword,
        color: vehicle.color,
        plate: vehicle.plate,
        capacity: vehicle.capacity,
        vehicleType: vehicle.vehicleType
    });

    const token = await captain.generateAuthToken();
    res.status(201)
    .json(new ApiResponse(201, "Captain registered successfully", { captain, token }));
});

const loginCaptain = asyncHandler(async (req, res) => {

        const { email, password } = req.body;
        if(!email || !password) {
            throw new ApiError(400, "Email and password are required");
        }

        const captain = await Captain.findOne({ email }).select("+password");
        if(!captain) {
            throw new ApiError(401, "Invalid email or password");
        }

        const isMatch = await captain.comparePassword(password);
        if (!isMatch) {
            throw new ApiError(401, "Invalid captain credentials");
        }

        const token = await captain.generateAuthToken();
        res.status(200)
        .json(new ApiResponse(200, "Captain logged in successfully", { captain, token }));
});

const getCaptainProfile = asyncHandler(async (req, res) => {
    const captain = req.captain;
    res.status(200)
    .json(new ApiResponse(200, "Captain profile retrieved successfully", { captain }));
});

const logoutCaptain = asyncHandler(async (req, res) => {

    const token = req.cookies.token || req.headers.authorization?.split(" ")[1];
    if (!token) {
        throw new ApiError(400, "No token provided");
    }

    await BlacklistToken.create({ token });

    res.clearCookie("token");
    res.status(200)
    .json(new ApiResponse(200, "Captain logged out successfully"));

});

export {
    registerCaptain,
    loginCaptain,
    logoutCaptain,
    getCaptainProfile
}
