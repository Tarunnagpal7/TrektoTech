import React from 'react'
import { Link } from 'react-router-dom';

function Error() {
  return (
    <div className='w-full h-svh bg-violet-950 flex justify-center items-center flex-col'>
         <h1 className='text-white text-6xl text-center font-bold'>404 page not found</h1>
         <Link to='/' >
         <button className='text-white m-10 border-white border-2 p-3 rounded-lg hover:bg-white hover:text-black' > GO Back Home</button>
         </Link>
    </div>
  )
}

export default Error;