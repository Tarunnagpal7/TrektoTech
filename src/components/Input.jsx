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
                    <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 block m-1 " htmlFor={Id}>{label}
                        </label>}

                        <input 
                        type={type} 
                        className={`px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border-1 border-black  w-full${classname}`}
                         ref = {ref}
                         {...props}
                         id = {Id}
                        >
                        </input>
                        <p class="mt-1 text-xs text-gray-500 mb-5">*This field is required</p>
                </div>
        )
    }
)