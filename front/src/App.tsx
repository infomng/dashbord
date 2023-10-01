import Home from "./pages/home/Home";
import { createBrowserRouter, RouterProvider, Outlet, Navigate } from "react-router-dom";
import Users from "./pages/users/Users";
import Products from "./pages/products/Products";
import Navbar from "./components/navbar/Navbar";
import Footer from "./components/footer/Footer";
import Menu from "./components/menu/Menu";
import Login from "./pages/login/Login";
import "./styles/global.scss";
import User from "./pages/user/User";
import Product from "./pages/product/Product";
import AuthContext from "./context/AuthContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactNode, useContext } from "react";
import Chat from "./components/chat/Chat";
import Profile from "./components/profile/Profile";
import ForgotPassword from "./pages/forgotPassword/ForgotPassword";

const queryClient = new QueryClient();


function App() {
const { user } = useContext(AuthContext);


  const ProtectedRoute = ({children}:{children:ReactNode})=>{
    if(!user){
      return <Navigate to = "/login" />;
    }

    return children;
  }
  const Layout = () => {
    return (
      <div className="main">
        <div className="navbarContainer">
          <Navbar />
        </div>

        <div className="container">
          <div className="menuContainer">
            <Menu />
          </div>
          <div className="contentContainer">
            <QueryClientProvider client={queryClient}>
              <Outlet />
            </QueryClientProvider>
          </div>
        </div>
        <div className="footer">
          <Footer />
        </div>
      </div>
    );
  };

  const router = createBrowserRouter([
    {
      path: "/",
      
      element:(  <ProtectedRoute>
        <Layout />,
         </ProtectedRoute>),
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/users",
          element: <Users />,
        },
        {
          path: "/products",
          element: <Products />,
        },
        {
          path: "/forgot-password",
          element: <ForgotPassword />,
        },
        {
          path: "/user/:id",
          element: <User />,
        },
        {
          path: "/product/:id",
          element: <Product />,
        },
        {
          path: "/chat",
          element: <Chat />,
        },
        {
          path: "/profile/:id",
          element: <Profile />,
        },
      ],
    },
    {
      path: "/login",
      element: <Login />
    },
 
  ]);

  return <RouterProvider router={router} />;
}

export default App;

