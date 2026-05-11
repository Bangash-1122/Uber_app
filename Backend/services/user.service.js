import { User } from "../models/usermodel.js";

export default createUser = async ({
    fistname,
    lastname,
    email,
    password
}) => {
    if (!fistname || !email || !password) {
        throw new Error('All fields are required');
    }

    const user = userModel.create({
        fullname: {
            firstname,
            lastname
        },
        email,
        password
    })

    return user;
}