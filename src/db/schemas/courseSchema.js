const {Schema, SchemaTypes} = require("mongoose")

const courseSchema = new Schema({
    title: String,
    price: Number,
    offer: Number,
    videosCount: Number,
    teacher: SchemaTypes.ObjectId,
    lastUpdate: Date,
})