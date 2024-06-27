import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Provider } from 'react-redux'
import store from "./store/store.js"
import { RouterProvider,createBrowserRouter } from 'react-router-dom'
import {Protected  } from "./components/index.js"
import Home from "./pages/Home.jsx"
import AddPost from './pages/AddPost.jsx'
import Login from './pages/Login.jsx'
import EditPost from './pages/EditPost.jsx'
import Signup from './pages/Signup.jsx'
import Post from './pages/Post.jsx'
import AllPosts from "./pages/AllPosts.jsx"
import Profile from './components/Profile/Profile.jsx'
import Error from './pages/Error.jsx'
const router = createBrowserRouter([
  {
    path : "/",
    element : <App />,
    errorElement:<Error />, //when routes to non existing page.
    children: [
      {
        path : '/',
        element:<Home />
      },
      {
        path:"/login",
        element:(
          <Protected authentication={false}>
            <Login />
          </Protected>
        )
      },
        {
            path: "/signup",
            element: (
                <Protected authentication={false}>
                    <Signup />
                </Protected>
            ),
        },
        {
            path: "/all-posts",
            element: (
                <Protected authentication>
                    {" "}
                    <AllPosts />
                </Protected>
            ),
        },
        {
            path: "/add-post",
            element: (
                <Protected authentication>
                    {" "}
                    <AddPost />
                </Protected>
            ),
        },
        {
            path: "/edit-post/:slug",
            element: (
                <Protected authentication>
                    {" "}
                    <EditPost />
                </Protected>
            ),
        },
        {
            path: "/post/:slug",
            element: <Post />,
        },
        {
          path: "/profile",
          element: (
            <Protected authentication>
               <Profile />
            </Protected>
          )
        },
    ],
      }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
  <Provider store={store}>
     <RouterProvider router={router}/>
  </Provider>
  </React.StrictMode>
)
