import { RouteProps, createBrowserRouter } from "react-router-dom";
import useAuth from "./hooks/useAuth";
import Feed from "./components/Feed";

const withAuth = (Component: React.ComponentType<RouteProps>) => {
  return (props: RouteProps) => {
    const { user } = useAuth();
    console.log("user", user);

    return user ? <Component {...props} /> : <h1>Have to login first!</h1>;
  };
};

const AuthenticatedHomePage = withAuth(Feed);

export default createBrowserRouter([
  {
    path: "/",
    element: <AuthenticatedHomePage />,
  },
  {
    path: "/feed",
    element: <Feed />,
  },
]);
