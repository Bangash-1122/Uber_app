import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema({
    fullname: {
        firstname: {
            type: String,
            required: true,
            minlenght: [3, 'First name must be at least 3 characters long']
        },
        lastname: {
            type: String,
            minlenght: [3, 'Last name must be at least 3 characters long']
        }
    },
    email: {
        type: String,
        required: true,
        unique: true,
        minlenght: [6, 'Email must be at least 6 characters long']
    },
    password: {
        type: String,
        required: true,
        select: false,
        minlenght: [6, 'Password must be at least 8 characters long']
    },
    sockedId: {
        type: String
    }
}, {
    timestamps: true
})

userSchema.methods.generateAuthToken = function() {
    return jwt.sign({
            _id: this.id,
        },
        process.env.ACCESS_TOKEN_SECRET,

        {
            expiresIn: '24h'
        })
}

userSchema.pre("save", async function(next) {
    if (!this.isModified("password")) return next();

    this.password = await bcrypt.hash(this.password, 10);
    next();
})
userSchema.methods.isPasswordCorrect = async function(password) {
    return await bcrypt.compare(password, this.password)
}


export const User = mongoose.model("User", userSchema);