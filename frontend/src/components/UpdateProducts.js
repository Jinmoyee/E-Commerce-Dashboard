import React from "react";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const UpdateProduct = () => {
    const params = useParams()
    let navigate = useNavigate()
    const [name, setName] = useState("")
    const [price, setPrice] = useState("")
    const [catagory, setCatagory] = useState("")
    const [brand, setBrand] = useState("")
    const [error, setError] = useState(false)

    useEffect(() => {
        getData()
    }, [])

    const getData = async () => {
        console.log(params)
        let result = await fetch(`http://localhost:5000/products/${params.id}`, {
            headers: {
                "Authorization": `bearer ${JSON.parse(localStorage.getItem("token"))}`
            }
        })
        result = await result.json()
        console.log(result)
        setName(result.name)
        setPrice(result.price)
        setCatagory(result.catagory)
        setBrand(result.brand)
    }

    const productData = async () => {

        if (!name || !price || !catagory || !brand) {
            setError(true)
            return false
        }

        console.log(name, price, catagory, brand)
        let result = await fetch(`http://localhost:5000/products/${params.id}`, {
            method: "put",
            body: JSON.stringify({ name, price, catagory, brand }),
            headers: {
                "Content-type": "application/json",
                "Authorization": `bearer ${JSON.parse(localStorage.getItem("token"))}`
            }
        })
        result = await result.json()
        console.log(result)
        navigate("/")
    }

    return (
        <div className="addProduct-tag">
            <h1 className="underline font-semibold">Update Product</h1>
            <div className="w-full flex flex-col items-center">
                <input type="text" placeholder="Enter your product name" onChange={(e) => setName(e.target.value)} value={name} className="w-[90%] sm:w-[80%] md:w-[60%] lg:w-[50%] p-2 outline-none text-lg" />
                {error && !name && <span className="vaild-data">! Enter a valid name !</span>}
                <br />

                <input type="text" placeholder="Enter your product price" onChange={(e) => setPrice(e.target.value)} value={price} className="w-[90%] sm:w-[80%] md:w-[60%] lg:w-[50%] p-2 outline-none text-lg" />
                {error && !price && <span className="vaild-data">! Enter a valid price !</span>}
                <br />

                <input type="text" placeholder="Enter the catagory of your product" onChange={(e) => setCatagory(e.target.value)} value={catagory} className="w-[90%] sm:w-[80%] md:w-[60%] lg:w-[50%] p-2 outline-none text-lg" />
                {error && !catagory && <span className="vaild-data">! Enter a valid catagory !</span>}
                <br />

                <input type="text" placeholder="Enter the brand of your product" onChange={(e) => setBrand(e.target.value)} value={brand} className="w-[90%] sm:w-[80%] md:w-[60%] lg:w-[50%] p-2 outline-none text-lg" />
                {error && !brand && <span className="vaild-data">! Enter a valid brand !</span>}
                <br />

                <button className="bg-slate-800 p-3 w-[90%] sm:w-[80%] md:w-[60%] lg:w-[50%] text-lg text-white hover:opacity-80" onClick={productData}>Update Product</button>
            </div>
        </div >
    );
}

export default UpdateProduct