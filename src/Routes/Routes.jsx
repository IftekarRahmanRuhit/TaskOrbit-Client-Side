import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../MainLayout/MainLayout";
import Home from "../Pages/Home/Home";

import Login from "../Pages/Authentication/Login";
import Register from "../Pages/Authentication/Register";
import AddTask from "../Pages/AddTask/AddTask";
import TaskManagement from "../TaskManagement/TaskManagement";
import PrivateRoute from "./PrivateRoute";


export const routes = createBrowserRouter([
    {
      path: "/",
      element: <MainLayout></MainLayout>,
      children: [
        {
            path:'/',
            element: <Home></Home>,
           
        },
        {
            path:'/addTask',
            element:<PrivateRoute><AddTask></AddTask></PrivateRoute>,
           
        },
        {
            path:'/allTask',
            element: <PrivateRoute><TaskManagement></TaskManagement></PrivateRoute>,
           
        },
 
      ]
    },
    {
        path: '/login',
        element: <Login></Login>
    },
    {
        path: '/register',
        element: <Register></Register>
    },
  ]);
