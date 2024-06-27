import { useId } from "react";
import React from "react";
import { forwardRef } from "react";

export const Input = forwardRef(
    function Input({
        label,
        type = "text",
        classname ="",
        ...props
    },ref){
        const Id = useId();
        return (
                <div className="w-full">
                    {label && 
                    <label className="block mb-1 pl-1 " htmlFor={Id}>{label}
                        </label>}

                        <input 
                        type={type} 
                        className={`px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border-1 border-black  w-full${classname}`}
                         ref = {ref}
                         {...props}
                         id = {Id}
                        >
                        </input>
                </div>
        )
    }
)