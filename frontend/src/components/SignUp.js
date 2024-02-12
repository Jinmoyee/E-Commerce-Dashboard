import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"

const SignUp = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPass] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const auth = localStorage.getItem("user")
        if (auth) {
            navigate("/")
        }
    })

    const collectData = async () => {
        console.log(name, email, password);
        const data = await fetch("http://localhost:5000/register", {
            method: 'post',
            body: JSON.stringify({ name, email, password }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const result = await data.json()
        navigate("/")
        console.log(result)
        localStorage.setItem("user", JSON.stringify(result.result))
        localStorage.setItem("token", JSON.stringify(result.token))
    }

    return (
        <div className="flex flex-col item-center justify-center w-full mt-[10vh]">
            <h1 className="text-3xl underline">Register</h1>
            <div className="flex item-center justify-center w-full">
                <div className="flex flex-col items-center w-full gap-2">
                    <input type="text" placeholder="Enter your name" onChange={(e) => setName(e.target.value)} value={name} className="w-[90%] sm:w-[80%] md:w-[60%] lg:w-[50%] p-2 outline-none text-lg" />

                    <input type="email" placeholder="Enter your Email" onChange={(e) => setEmail(e.target.value)} value={email} className="w-[90%] sm:w-[80%] md:w-[60%] lg:w-[50%] p-2 outline-none text-lg" />

                    <input type="text" placeholder="Enter your password" onChange={(e) => setPass(e.target.value)} value={password} className="w-[90%] sm:w-[80%] md:w-[60%] lg:w-[50%] p-2 outline-none text-lg" />
                    <br />
                    <button className="bg-slate-800 p-3 w-[90%] sm:w-[80%] md:w-[60%] lg:w-[50%] text-lg text-white hover:opacity-80" onClick={collectData}>Sign Up</button>
                </div>
            </div>
        </div>
    )
}

export default SignUp