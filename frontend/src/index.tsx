import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import SignUp from "./Pages/Signup";
import DIPSignUp from "./Pages/DIPSignup";
import LogIn from "./Pages/LogIn";
import TodoPage from "./Pages/TodoPage";
import { ChakraProvider } from "@chakra-ui/react";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "sign-up",
        element: <SignUp />,
      },
      {
        path: "dip-sign-up",
        element: <DIPSignUp />,
      },
      {
        path: "log-in",
        element: <LogIn />,
      },
      {
        path: "todos",
        element: <TodoPage />,
      },
    ],
  },
]);

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

// );
root.render(
  <ChakraProvider>
    <RouterProvider router={router} />
  </ChakraProvider>
);
