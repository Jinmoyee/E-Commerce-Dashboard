import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom"

const AddProduct = () => {
    const navigate = useNavigate()
    const [name, setName] = useState("")
    const [price, setPrice] = useState("")
    const [catagory, setCatagory] = useState("")
    const [brand, setBrand] = useState("")
    const [error, setError] = useState(false)

    const productData = async () => {

        if (!name || !price || !catagory || !brand) {
            setError(true)
            return false
        }

        console.log(name, price, catagory, brand)
        const userId = (JSON.parse(localStorage.getItem("user")))._id

        const data = await fetch("http://localhost:5000/add-product", {
            method: "post",
            body: JSON.stringify({ name, price, catagory, brand, userId }),
            headers: {
                "Content-Type": "application/json",
                "Authorization": `bearer ${JSON.parse(localStorage.getItem("token"))}`
            }
        })
        const result = await data.json()
        console.log(result)
        navigate('/')
    }

    return (
        <div className="flex flex-col items-center">
            <h1 className="underline font-semibold">Add Product</h1>
            <div className="w-full flex flex-col items-center">
                <input type="text" placeholder="Enter your product name" onChange={(e) => setName(e.target.value)} value={name} className="w-[90%] sm:w-[80%] md:w-[60%] lg:w-[50%] p-2 outline-none text-lg" />
                {error && !name && <span className="text-black text-lg p-1">! Enter a valid name !</span>}
                <br />

                <input type="text" placeholder="Enter your product price" onChange={(e) => setPrice(e.target.value)} value={price} className="w-[90%] sm:w-[80%] md:w-[60%] lg:w-[50%] p-2 outline-none text-lg" />
                {error && !price && <span className="text-black text-lg p-1">! Enter a valid price !</span>}
                <br />

                <input type="text" placeholder="Enter the catagory of your product" onChange={(e) => setCatagory(e.target.value)} value={catagory} className="w-[90%] sm:w-[80%] md:w-[60%] lg:w-[50%] p-2 outline-none text-lg" />
                {error && !catagory && <span className="text-black text-lg p-1">! Enter a valid catagory !</span>}
                <br />

                <input type="text" placeholder="Enter the brand of your product" onChange={(e) => setBrand(e.target.value)} value={brand} className="w-[90%] sm:w-[80%] md:w-[60%] lg:w-[50%] p-2 outline-none text-lg" />
                {error && !brand && <span className="text-black text-lg p-1">! Enter a valid brand !</span>}
                <br />
                <button className="bg-slate-800 p-3 w-[90%] sm:w-[80%] md:w-[60%] lg:w-[50%] text-lg text-white hover:opacity-80" onClick={productData}>Add Product</button>
            </div>
        </div >
    );
}

export default AddProduct