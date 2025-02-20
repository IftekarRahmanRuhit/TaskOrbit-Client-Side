import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../MainLayout/MainLayout";
import Home from "../Pages/Home/Home";
import TaskBoard from "../Pages/TaskBoard/TaskBoard";
import Login from "../Pages/Authentication/Login";
import Register from "../Pages/Authentication/Register";


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
            path:'/taskBoard',
            element: <TaskBoard></TaskBoard>,
           
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
