import './styles/global.scss'
import { createRoot } from "react-dom/client";

import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
  Outlet,
} from "react-router-dom";
import Home from "./pages/home/Home";
import Navbar from './components/navbar/Navbar';
import Menu from './components/menu/Menu';
import Footer from './components/footer/Footer';
import Login from './pages/login/Login';
import Register from './pages/register/register';
// import Login from "./pages/login/Login";

function App(){

 const  Layout = ()=>{

  return (
    <div className="main">
      <div className="navbar"><Navbar/></div>
      <div className="menu-outlet">
        <div className="menu">
          <Menu/>
        </div>
        <div className="outlet" >
          <Outlet />
        </div>
      </div>
      <div className="footer"><Footer/></div>
    </div>
  );
}

const router = createBrowserRouter([
  {
    path: "/",
    element: (
  <Layout/>),

  children:[
    {path:"/",
    element:<Home/>}
  ]
    ,
  },
  {
    path: "login",
    element: <div> <Login/> </div>,
  }  , {
      path: "/register",
      element: <Register/>
    },
]);


  return <RouterProvider router={router} />
}
export default App;