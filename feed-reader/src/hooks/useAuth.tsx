import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

interface IUser {
  id: string;
  name: string;
  password: string;
}

interface IAuthContext {
  user?: IUser | null;
  login: (user: IUser) => void;
  logout: () => void;
}

const AuthContext = createContext<IAuthContext>({} as IAuthContext);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<IUser | null>(null);

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      setUser(JSON.parse(user));
    }
  }, []);

  function login(user: IUser) {
    setUser(user);
    localStorage.setItem("user", JSON.stringify(user));
  }

  function logout() {
    setUser(null);
    localStorage.removeItem("user");
  }

  const memoedValue = useMemo(
    () => ({
      user,
      login,
      logout,
    }),
    [user]
  );

  return (
    <AuthContext.Provider value={memoedValue}>{children}</AuthContext.Provider>
  );
}

export default function useAuth() {
  return useContext(AuthContext);
}
