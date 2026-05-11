import { User } from "../models/user.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import createUser from "../services/user.service.js"
import { BlacklistToken } from "../models/blacklistToken.model.js";

const registerUser = asyncHandler(async (req, res) => {
    //get user details form frontend
    //validation - no empty
    // check if user already exists: username or email
    //check for images, check for avatar
    //upload them to cloudinary , avatar
    //create user object - create entery in db
    //remove password and refresh token field from response
    // check for user creation
    // return response
    const {fullname, email, password } = req.body;
    if (
        [fullname, email, password].some((field) => field?.trim() === "")
    ) {
        throw new ApiError(400, "All fields are required")
    }

    const isUserAlready = await userModel.findOne({ email });

    if(isUserAlready){
        throw new ApiError(409, "User with this email already exists")
    }
    const hashedPassword = await userModel.hashPassword(password);

    const user = await userService.createUser(
        {
            firstname: fullname.firstname,
            lastname: fullname.lastname,
            email,
            password: hashedPassword
        }
    );

    const token = user.generateAuthToken();
    res.status(201).json(new ApiResponse(true, "User registered successfully", { user, token }));
    });

const loginUser = asyncHandler(async (req, res) => {

        const {email, password} = req.body;

        if(!email || !password){
            throw new ApiError(400, "Email and password are required");
        }

        const user = await User.findOne({ email }).select("+password");

        if (!user) {
            throw new ApiError(401, "Invalid email or password")
        }

        const isMatch = await user.comparePassword(password);

        if (!isMatch) {
            throw new ApiError(401, "Invalid to user  Credentional")
        }

        const token = user.generateAuthToken();

        const options = {
            httpOnly: true,
            secure: true
        }

        return res.status(200)
        .cookie("accessToken", accessToken, options)
        .cookie("refreshToken", refreshToken, options)
        .json(
            new ApiResponse(
                200,
                {
                    user: loggedInUser, accessToken, refreshToken
                },
                "User logged in successfully"
            )
        );
    });

const getUserProfile = asyncHandler(async (req, res) => {
        const user = req.user;
        if (!user) {
            throw new ApiError(404, "User not found");
        }
        res.status(200).json(new ApiResponse(true, "User profile fetched successfully", user));
    });

const logoutUser = asyncHandler(async (req, res) => {
    res.clearCookie("accessToken");

    const token = req.cookies.token || req.headers.authorization?.split(" ")[1];
    if (token) {
        res.clearCookie("refreshToken");
    }
        await BlacklistToken.create({ token });

    res.status(200)
    .json(new ApiResponse(true, "User logged out successfully", null));
});

export {
    registerUser,
    loginUser,
    getUserProfile,
    logoutUser
}