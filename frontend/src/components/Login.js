import React, { useEffect } from "react"
import { useNavigate } from "react-router-dom"

const Login = () => {
    const navigate = useNavigate()

    const [name, setName] = React.useState('')
    const [password, setPass] = React.useState('')

    useEffect(() => {
        const auth = localStorage.getItem("user")
        if (auth) {
            navigate("/")
        }
    }, [])

    const handleLogin = async () => {
        console.log(name, password)
        const result = await fetch("http://localhost:5000/login", {
            method: "post",
            body: JSON.stringify({ name, password }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const totalResult = await result.json()
        console.warn(totalResult)
        if (totalResult.token) {
            localStorage.setItem("user", JSON.stringify(totalResult.user))
            localStorage.setItem("token", JSON.stringify(totalResult.token))
            navigate("/")
        }
        else {
            alert("User not found")
        }
    }

    return (
        <div className="flex flex-col item-center justify-center w-full mt-[10vh]">
            <h1 className="text-3xl underline">Log In</h1>
            <div className="flex item-center justify-center w-full">
                <div className="flex flex-col items-center w-full gap-2">
                    <input type="text" placeholder="Enter the user name" onChange={(e) => setName(e.target.value)} value={name} className="w-[90%] sm:w-[80%] md:w-[60%] lg:w-[50%] p-2 outline-none text-lg" />
                    <input type="text" placeholder="Enter your password" onChange={(e) => setPass(e.target.value)} value={password} className="w-[90%] sm:w-[80%] md:w-[60%] lg:w-[50%] p-2 outline-none text-lg" />
                    <br />
                    <button className="bg-slate-800 p-3 w-[90%] sm:w-[80%] md:w-[60%] lg:w-[50%] text-lg text-white hover:opacity-80" onClick={handleLogin}>Log In</button>
                </div>
            </div>
        </div>
    )
}

export default Login