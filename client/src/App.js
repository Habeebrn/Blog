import React from 'react'
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Outlet
} from "react-router-dom";
import { Register } from './pages/Register';
import { Single } from './pages/Single';
import { Login } from './pages/Login';
import { Navbar } from './Components/Navbar';
import { Home } from './pages/Home';
import { Footer } from './Components/Footer';
import { Write } from './pages/Write';
import "./style.scss"


const Layout = () => {

    return (

      <>
          <Navbar/>
          <Outlet/>
          <Footer/>

      
      </>

    )
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout/>, 
    children: [
      {
        path:"/",
        element: <Home/>
      },
      {
        path: "/post/:id",
        element: <Single/>
      },
      {
        path: "/write",
        element: <Write/>
      }
    ]

  },
  {
    path: "/Register",
    element: <Register/>
  },
  {
    path: "/login",
    element: <Login/>
  },
  {
    path: "/single",
    element: <Single/>
  },
 
]);

export const App = () => {
  return (
    <div className='app'>
      <div className='container'>
      <RouterProvider router={router} />
      </div>
    </div>
  )
}

export default App;
