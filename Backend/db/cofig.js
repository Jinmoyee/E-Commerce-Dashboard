require('dotenv').config()

const mongoose = require("mongoose")

mongoose.connect(process.env.MONGO).then(() => {
    console.log("DB connected")
}).catch((error) => {
    console.log(error)
})


//Zq52i9iQA0V66bQa