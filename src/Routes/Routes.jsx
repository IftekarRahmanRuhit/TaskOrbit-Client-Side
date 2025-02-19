import { createBrowserRouter } from "react-router-dom";

export const routes = createBrowserRouter([
  {
    path: "/",
    element: <div className="text-4xl text-red-500">Hello world!</div>,
  },
]);
