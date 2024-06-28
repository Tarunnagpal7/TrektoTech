import React,{useState} from "react";
import authService from "../appwrite/auth";
import {login} from "../store/authSlice"
import { Link,useNavigate } from "react-router-dom";
import {Button,Logo , Input } from "./index"
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";

function Signup(){

    const navigate = useNavigate()
    const dispatched = useDispatch()
    const [error ,setError] = useState("")
    const {register , handleSubmit} = useForm()

    const create = async(data)=>{
        setError("")
        
        try{
            const session = await authService.createAccount(data)
            if(session){
                const userData = await authService.getCurrentUser();
                if(userData) dispatched(login(userData));
                navigate("/")
            }
        }catch(error){
            setError(error.message)
        }

    }

    return(
        <div className="flex items-center justify-center  ">
        <div className={`mx-auto w-full max-w-lg bg-pink-50 rounded-xl p-10 border-2 border-black/10 shadow-xl  `}>
        <div className="mb-2 flex justify-center">
                <span className="inline-block w-full text-center">
                    <Logo width="100" />
                </span>
            </div>
            <h2 className="text-center text-2xl font-bold leading-tight">Sign up to create account</h2>
            <p className="mt-2 text-center text-base text-black/60">
                Already have an account?&nbsp;
                <Link
                    to="/login"
                    className="font-medium text-primary transition-all duration-200 hover:underline"
                >
                    LogIn
                </Link>
            </p>
            {error && <p className="text-red-600 mt-8 text-center">{error}</p>}

            <form onSubmit={handleSubmit(create)}>
                <div className='space-y-5'>
                    <Input
                    label="Full Name: "
                    placeholder="Enter your full name"
                    {...register("name", {
                        required: true,
                    })}
                    />
                    <Input
                    label="Email: "
                    placeholder="Enter your email"
                    type="email"
                    {...register("email", {
                        required: true,
                        validate: {
                            matchPatern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                            "Email address must be a valid address",
                        }
                    })}
                    />
                    <Input
                    label="Password: "
                    type="password"
                    placeholder="Enter your password"
                    {...register("password", {
                        required: true,})}
                    />
                    <Button type="submit" className="w-full rounded-xl border-2 border-pink-100 p-3 hover:bg-pink-100">
                        Create Account
                    </Button>
                </div>
            </form>
        </div>

</div>

                    )
}

export default Signup;