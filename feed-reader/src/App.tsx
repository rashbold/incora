import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Feed from "./components/Feed";

const router = createBrowserRouter([
  {
    path: "/",
    element: <div className="text-3xl">Hello world!</div>,
  },
  {
    path: "/feed",
    element: <Feed />,
  },
]);

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
