import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Feed from "./components/Feed";
import { AuthProvider } from "./hooks/useAuth";

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
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </>
  );
}

export default App;
