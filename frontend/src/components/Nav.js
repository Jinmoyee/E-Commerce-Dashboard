import React from "react"
import { NavLink, useNavigate } from "react-router-dom"

const Nav = () => {
    const auth = localStorage.getItem("user")
    const navigate = useNavigate()
    const logout = () => {
        localStorage.clear()
        navigate("/signUp")
    }

    return (
        <div>
            {auth ?
                <ul className="flex justify-between gap-2 text-base md:text-lg font-semibold text-white bg-slate-800 p-5">
                    <div className="flex gap-4">
                        <li><NavLink to="/" className="p-2 hover:bg-[#4b9ab5] rounded-md">Home</NavLink></li>
                        <li><NavLink to="/add" className="p-2 hover:bg-[#4b9ab5] rounded-md">Add Products</NavLink></li>
                    </div>
                    <li><NavLink onClick={logout} to="/login" className="p-2 hover:bg-[#4b9ab5] rounded-md">Logout ({JSON.parse(auth).name})</NavLink></li>
                </ul>
                :
                <ul className="flex justify-end gap-5 text-base md:text-lg font-semibold text-white bg-slate-800 p-5">
                    <li><NavLink to="/login" className="p-2 hover:bg-[#4b9ab5] rounded-md">Login</NavLink></li>
                    <li><NavLink to="/signUp" className="p-2 hover:bg-[#4b9ab5] rounded-md">SignUp</NavLink></li>
                </ul>

            }
        </div >
    )
}

export default Nav