const Router = require("express").Router()
const {body} = require("express-validator")
const { validateRequest } = require("../Utils/validator")
const { getUserDataByEmail, getUserDataByPhone } = require("../Utils/auth")
const { User } = require("../db/schemas/userSchema")

const registerFields = [
    body("email").isEmail(),
    body("password").isString().notEmpty(),
    body("fullname").isString().notEmpty(),
    body("phonenumber").isMobilePhone("fa-IR").notEmpty(),
]

Router.post("/", process.Session, registerFields, validateRequest, async (req, res) => {
    const {email, fullname, password, phonenumber} = req.body
    if ((await getUserDataByEmail(email)).valid) {
        return res.status(400).json({message: "duplicate email"})
    }
    if ((await getUserDataByPhone(phonenumber)).valid) {
        return res.status(400).json({message: "duplicate phonenumber"})
    }
    const user = new User({email, fullname, password, phonenumber})
    await user.save()
    res.status(200).json({message: "created successfully"})
})

module.exports = {
    version: 1,
    route: "register",
    exec: Router
}