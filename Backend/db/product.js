const mongoose = require("mongoose")

const productSchema = mongoose.Schema({
    name: String,
    price: String,
    catagory: String,
    userId: String,
    brand: String,
    company: String
})

module.exports = mongoose.model("product", productSchema)