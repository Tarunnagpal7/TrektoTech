
import React from 'react'
import { useState } from 'react'
import './App.css'
import { useDispatch, useSelector } from 'react-redux'
import authService from './appwrite/auth.js'
import { useEffect } from 'react'
import { login,logout } from './store/authSlice'
import { Header,Footer } from './components'
import { Outlet } from 'react-router-dom'
// import conf from './conf/conf.js'


function App() {

 
  const [loading,setLoading] = useState(true)
  const dispatched = useDispatch()
  const userData = useSelector((state) => state.auth.userData)

   useEffect(()=>{ 
      authService.getCurrentUser()
      .then((userData)=>{
        if(userData){
          dispatched(login({userData}))
        }
        else{
          dispatched(logout())
        }
      })
      .finally( ()=>setLoading(false))


   },[])  
//  console.log(conf.appwriteProjectId)
 
//  console.log(userData)
 
  
  return !loading ?(
    <div className='min-h-screen flex flex-wrap content-between bg-gray-200 '>
     <div className='w-full block'>
       <Header />
       <main>
          <Outlet />
       </main>
       <Footer />
      </div> 
    </div>
  ) : null

  

}

export default App
