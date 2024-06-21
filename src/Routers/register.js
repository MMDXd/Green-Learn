const Router = require("express").Router()
const {body} = require("express-validator")
const { validateRequest } = require("../Utils/validator")
const { getUserDataByEmail } = require("../Utils/auth")
const { User } = require("../db/schemas/userSchema")

const registerFields = [
    body("email").isEmail(),
    body("password").isString().notEmpty(),
    body("fullname").isString().notEmpty(),
    body("phonenumber").isMobilePhone("fa-IR").notEmpty(),
]

Router.post("/", process.Session, registerFields, validateRequest, async (req, res) => {
    const {email, fullname, password} = req.body
    if ((await getUserDataByEmail(email)).valid) {
        return res.status(400).json({message: "duplicate email"})
    }
    const user = new User({email, fullname, password})
    await user.save()
    res.status(200).json({message: "created successfully"})
})

module.exports = {
    version: 1,
    route: "register",
    exec: Router
}