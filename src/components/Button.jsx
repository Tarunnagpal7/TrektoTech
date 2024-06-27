
export const  Button =({children
    ,type ="button",
    bgColor = "bg-blue-600",
    textColor = "text-white",
    classname= '',
    ...props
})=>{


    return (
        <button
               className={`inline-bock px-6 py-2 duration-200 hover:bg-blue-100 rounded-full ${bgColor} ${textColor} ${classname}`} {...props}
        >{children}</button>
    )

}