import {Container , Logo , LogoutBTN} from "../index"
import { Link } from "react-router-dom"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"


export const Header =()=>{
    const navigate = useNavigate();
    const authStatus = useSelector((state)=> state.auth.status)

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
    return(
        <header className="py-3 shadow bg-violet-950 text-white font-bold text-sm ">
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
                                  onClick={()=>navigate(item.slug)}
                                  className="inline-bock px-6 py-2 duration-200 hover:bg-pink-200 hover:text-violet-950 rounded-full "
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