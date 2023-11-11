import { RouteProps, createBrowserRouter } from "react-router-dom";
import useAuth from "./hooks/useAuth";
import Home from "./components/Home";
import LoginPage from "./components/LoginPage";
import FeedList from "./components/FeedList";

const withAuth = (Component: React.ComponentType<RouteProps>) => {
  return (props: RouteProps) => {
    const { user } = useAuth();
    return user ? <Component {...props} /> : <LoginPage />;
  };
};

const AuthenticatedHomePage = withAuth(Home);

export default createBrowserRouter([
  {
    path: "/",
    element: <AuthenticatedHomePage />,
  },
  {
    path: "/feed",
    element: <Home />,
  },
  {
    path: "/feed/:id",
    element: <FeedList />,
  },
]);
