const {Schema, model, models} = require("mongoose")
const bcrypt = require("bcrypt")


const userSchema = new Schema({
    email: String,
    password: String,
    salt: String,
    fullname: String,
    isAdmin: {
        type: Boolean,
        default: false
    },
    profileURLPath: {
        type: String,
        default: "/images/users/noProfile.jpg"
    }
})

userSchema.pre("save", async function(next) {
    this.salt = await bcrypt.genSalt();
    this.password = bcrypt.hashSync(this.password, this.salt)
    next()
})


let User = models.User || model("User", userSchema)

module.exports = { User }