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

type UserCredentials = Pick<IUser, "name" | "password">;

interface IAuthContext {
  user: IUser | null;
  login: (credentials: UserCredentials) => Promise<void>;
  logout: () => void;
  error: string | null;
}

const AuthContext = createContext<IAuthContext>({} as IAuthContext);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<IUser | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      setUser(JSON.parse(user));
    }
  }, []);

  const login = async (credentials: UserCredentials) => {
    setError(null);
    const { name, password } = credentials;
    fetch(`http://localhost:3900/api/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, password }),
    }).then(async (res) => {
      if (res.ok) {
        const user = await res.json();
        setUser(user);
        localStorage.setItem("user", JSON.stringify(user));
        setError(null);
      } else {
        setError("Invalid credentials");
      }
    });
  };

  function logout() {
    setUser(null);
    localStorage.removeItem("user");
  }

  const memoedValue = useMemo(
    () => ({
      user,
      error,
      login,
      logout,
    }),
    [user, error]
  );

  return (
    <AuthContext.Provider value={memoedValue}>{children}</AuthContext.Provider>
  );
}

export default function useAuth() {
  return useContext(AuthContext);
}
