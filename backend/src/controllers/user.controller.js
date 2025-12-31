import  jwt  from "jsonwebtoken";
import { User } from "../models/user.model.js";
import bcrypt from "bcrypt";

const signUp = async (req, res) => {
    try {
        const {
            name,
            email,
            password
        } = req.body

        if (!name || !email || !password) {
            return res.status(400).json({ success: false, message: "All required fields are missing" });
        }

        const userExists = await User.findOne({ email })

        if (userExists) {
            return res.status(400).json({ message: "Email already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10)

        const user = new User({
            name,
            email,
            password: hashedPassword
        })

        await user.save()

        //Remove password in response
        const userObj = user.toObject();
        delete userObj.password;

        res.status(200).json({ success: true, message: "User Created Successfully", data: userObj })

    } catch (error) {
        return res.status(500).json({ success: false, message: "Internal Server Error" })
    }
}

const signIn = async (req, res) => {
    try {
        const { email, password } = req.body
        if (!email || !password) {
            return res.status(400).json({ success: false, message: "All required fields are missing" });
        }

        const user = await User.findOne({ email })
        console.log(user)
        if (!user) {
            return res.status(404).json({ success: false, message: "User Not Found" })
        }

        const isMatched = await bcrypt.compare(password, user.password)

        if (!isMatched) {
            return res.status(401).json({ success: false, message: "Incorrect password" });
        }

        //generate token
        const token = jwt.sign({ id: user._id, email: user.email, name:user.name }, process.env.JWT_SECRET, { expiresIn: process.env.EXPIRE_TOKEN })

        const loginUser = await User.findOne({ email }).select("-password -token")

        return res.cookie("private-instagram-token", token, {
            httpOnly: true,
            secure: false,
            sameSite: "lax"
        }).status(200).json({ success: true, message: "Login successful", data: loginUser })

    } catch (error) {
        console.log(error)
        return res.status(500).json({ success: false, message: "Internal Server Error" })
    }
}

const profile = async (req, res) => {
    try {
        const userId = req.user.id //Id from middleware

        const user = await User.findById(userId, "-password")

        return res.status(200).json({ success: true, message: "ok", data: user })
    } catch (error) {
        return res.status(500).json({ success: false, message: "Internal Server Error" })
    }
}

const logout = async (req, res) => {
    try {
        res.clearCookie("private-instagram-token", {
            httpOnly: true,
            secure: false,
            sameSite: "lax",
        });

        return res.status(200).json({
            success: true,
            message: "Logout successful",
        });
    } catch (error) {
        return res.status(500).json({ success: false, message: "Internal Server Error" })
    }
}








export {
    signUp,
    signIn,
    profile,
    logout
}