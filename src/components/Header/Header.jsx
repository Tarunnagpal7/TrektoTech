import {Container , Logo , LogoutBTN} from "../index"
import { Link } from "react-router-dom"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { useState } from "react"


export const Header =()=>{
    const navigate = useNavigate();
    const authStatus = useSelector((state)=> state.auth.status)
    const [activeItem ,setActiveItem] = useState("Home");

console.log(authStatus)
    const navItems = [
        {
             name : "Home",
             slug : "/",
             active : true

        },
        {
             name : "Login",
             slug : "/login",
             active : !authStatus

        },
        {
             name : "SignUp",
             slug : "/signup",
             active : !authStatus

        },
        {
             name : "All Posts",
             slug : "/all-posts",
             active : authStatus

        },
        {
             name : "Write",
             slug : "/add-post",
             active : authStatus

        },{
            name : "Profile",
            slug : "/profile",
            active : authStatus
        }
    ]

    const handleClick =(slug,name)=>{
         setActiveItem(name)
         navigate(slug)
    }


    return(
        <header className="sm:py-3 py-2  shadow bg-violet-950 text-white font-bold text-xs  sm:text-sm ">
            <Container>
                <nav className="flex sm:justify-between justify-around items-center">
                    <div className="mr-4">
                        <Link to='/'>
                          <Logo />
                        </Link>
                    </div>
                    <ul className="flex ml-auto">
                        {navItems.map((item)=>  
                           item.active ? (
                            <li key={item.name}>
                                 <button 
                                  onClick={()=> handleClick(item.slug,item.name)}
                                  className={`inline-bock sm:px-6 px-2 py-2 duration-200 hover:bg-pink-200  hover:text-violet-950 rounded-full  ${activeItem === item.name ? 'bg-pink-200 text-violet-950' : ''} `}
                                 >{item.name}</button>
                            </li>
                           ) : null
                        )}
                        
                    </ul>
                </nav>
            </Container>
        </header>
    )
}