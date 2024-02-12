import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { RiDeleteBin5Fill } from "react-icons/ri";
import { MdOutlineModeEdit } from "react-icons/md";

const ProductList = () => {
    const [products, setProducts] = useState([])

    useEffect(() => {
        getProducts()
    }, [])

    const getProducts = async () => {
        let result = await fetch("http://localhost:5000/products", {
            headers: {
                "Authorization": `bearer ${JSON.parse(localStorage.getItem("token"))}`
            }
        })

        result = await result.json()
        setProducts(result)
    }

    const deleteData = async (id) => {
        console.log(id)
        let result = await fetch(`http://localhost:5000/products/${id}`, {
            method: "delete",
            headers: {
                "Authorization": `bearer ${JSON.parse(localStorage.getItem("token"))}`
            }
        })
        result = result.json()
        if (result) {
            alert("Data has been deleted")
            getProducts()
        }
        else {
            alert("Data is not found")
        }
    }

    const searchHandle = async (e) => {
        // console.log(e.target.value)
        let key = e.target.value
        if (key) {
            let result = await fetch(`http://localhost:5000/search/${key}`, {
                headers: {
                    "Authorization": `bearer ${JSON.parse(localStorage.getItem("token"))}`
                }
            })
            result = await result.json()
            if (result) {
                setProducts(result)
            }
        }
        else {
            getProducts()
        }
    }

    return (
        <div className="">
            <h1 className="font-semibold text-3xl underline">Product List</h1>
            <div className="flex justify-center">
                <input type="text" placeholder="Search..." className="w-[50%] p-3 mt-5 text-lg outline-none" onChange={searchHandle} />
            </div>
            <div className="mx-[3rem] my-[2rem] flex flex-row lg:flex-col">
                <ul className="bg-slate-800 text-white text-lg flex justify-evenly items-center p-3 flex-col lg:flex-row w-full">
                    <li>S. No</li>
                    <li>Name</li>
                    <li>Price</li>
                    <li>Catagory</li>
                    <li>Brand</li>
                    <li>Operation</li>
                </ul>
                <div className="flex flex-row lg:flex-col justify-center w-full overflow-y-scroll md:overflow-auto z-10">
                    {
                        products.length > 0 ? products.map((item, index) =>
                            <ul key={item._id} className="item-lists flex justify-center lg:justify-evenly items-center border-2 hover:bg-slate-500 flex-col lg:flex-row">
                                <li className="lists">{index}</li>
                                <li className="lists">{item.name}</li>
                                <li className="lists">Rs {item.price}</li>
                                <li className="lists">{item.catagory}</li>
                                <li className="lists">{item.brand}</li>
                                <li className="flex justify-between bg-slate-100 relative">
                                    <button className="delete-btn" onClick={() => deleteData(item._id)}><RiDeleteBin5Fill className="text-4xl text-red-600 p-2 rounded-full bg-black absolute top-3.5 left-[3rem]" /></button>
                                    <Link to={"update/" + item._id}><button className="update-btn" ><MdOutlineModeEdit className="text-4xl text-blue-600 p-2 rounded-full bg-black absolute top-3.5 right-[3rem]" /></button></Link>
                                </li>
                            </ul>) : <h1>Data not found</h1>
                    }
                </div>

            </div>
        </div >
    )
}

export default ProductList