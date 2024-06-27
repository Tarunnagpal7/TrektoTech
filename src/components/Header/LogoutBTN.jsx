import { useDispatch } from "react-redux";
import authService from "../../appwrite/auth";
import { logout } from "../../store/authSlice";

function LogoutBTN(){
   const dispatched  = useDispatch();

    const logoutHandler =()=>{
        authService.logout().then(()=>{
            dispatched(logout());
        })
    }

   return(
     <button className="inline-bock px-6 py-2 duration-200 border-2 bg-violet-950 text-white border-black hover:bg-pink-200  hover:text-violet-950 rounded-full"
       onClick={logoutHandler}
      >
        Logout
     </button> 
   )

}

export default LogoutBTN;