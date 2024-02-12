const express = require("express")
require("./db/cofig")
const Users = require("./db/users")
const cors = require("cors")
const Products = require("./db/product")
const app = express()
const jwt = require("jsonwebtoken")
const jwtKey = "random123"

app.use(cors())
app.use(express.json())

app.post("/register", async (req, res) => {
    let user = new Users(req.body)
    let result = await user.save()
    result = result.toObject()
    delete result.password
    jwt.sign({ result }, jwtKey, (err, token) => {
        if (err) {
            res.send({ result: "User not found" })
        }
        res.send({ result, token })
    })
})

app.post("/login", async (req, res) => {
    if (req.body.name && req.body.password) {
        let user = await Users.findOne(req.body).select("-password")
        if (user) {
            jwt.sign({ user }, jwtKey, (err, token) => {
                if (err) {
                    res.send({ result: "User not found" })
                }
                res.send({ user, token })
            })
        }
        else {
            res.send({ result: "No user found" })
        }
    }
    else {
        res.send({ result: "Check user name or password" })
    }
})

// app.get("/register", (req, res) => {
//     res.send("Connected to get data")
// })
// app.get("/", (req, res) => {
//     res.send("Connected")
// })
app.post("/add-product", verifyToken, async (req, res) => {
    let product = new Products(req.body)
    let result = await product.save()
    res.send(result)
})

app.get("/products", verifyToken, async (req, res) => {
    let products = await Products.find()
    if (products.length > 0) {
        res.send(products)
    }
    else {
        res.send("Products not found")
    }
})

app.delete("/products/:id", verifyToken, async (req, res) => {
    const result = await Products.deleteOne({ _id: req.params.id })
    res.send(result)
})

app.get("/products/:id", verifyToken, async (req, res) => {
    const result = await Products.findOne({ _id: req.params.id })
    if (result) {
        res.send(result)
    }
    else {
        res.send("Result not found")
    }
})

app.put("/products/:id", verifyToken, async (req, res) => {
    let result = await Products.updateOne(
        { _id: req.params.id },
        { $set: req.body }
    )
    res.send(result)
})

app.get("/search/:key", verifyToken, async (req, res) => {
    // const data = req.params.key
    // console.log(data)
    let data = await Products.find({
        "$or": [
            { name: { $regex: req.params.key } }
        ]
    })
    res.send(data)
})

// const verifyToken = (req, res, next) => {
//     console.log("Hehehehehhe")
//     next()
// }

function verifyToken(req, res, next) {
    let token = req.headers["authorization"]
    if (token) {
        token = token.split(" ")[1]
        console.log("Middleware Called.... ", token)
        jwt.verify(token, jwtKey, (err, valid) => {
            if (err) {
                res.send({ result: "Please provide a valid token to the header" })
            }
            else {
                next()
            }
        })
    }
    else {
        res.send({ result: "Please add the token to the header" })
    }
}

app.listen(5000, (req, res) => {
    console.log("server is working........")
})

// const express = require("express")
// const app = express()


// app.get("/", (req, res) => {
//     console.log("Connected...........")
// })

// app.listen(5000, (req, res) => {
//     console.log("server is working........")
// })

