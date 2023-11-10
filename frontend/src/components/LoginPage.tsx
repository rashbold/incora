import { useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";

const LoginButton = () => (
  <button
    type="submit"
    className="w-full px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded-md hover:bg-blue-600"
  >
    Login
  </button>
);

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showError, setShowError] = useState(false);

  const { login, error } = useAuth();

  useEffect(() => {
    if (error) {
      setShowError(true);
      setTimeout(() => setShowError(false), 2000);
    }
  }, [error]);

  const handleLogin = async () => {
    await login({ name: username, password });
    setUsername("");
    setPassword("");
  };

  return (
    <form
      className="p-8 mt-6 mb-0 space-y-4 rounded-lg shadow-2xl bg-white"
      onSubmit={(e) => {
        e.preventDefault();
        handleLogin();
      }}
    >
      {showError && (
        <div className="p-2 text-sm bg-red text-center bg-red-500 rounded-md font-bold">
          {error}
        </div>
      )}
      <div>
        <label htmlFor="username" className="text-sm font-medium">
          Username:
        </label>
        <input
          type="text"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full p-2 mt-1 border rounded-md"
          required
        />
      </div>
      <div>
        <label htmlFor="password" className="text-sm font-medium">
          Password:
        </label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 mt-1 border rounded-md"
          required
        />
      </div>
      <LoginButton />
    </form>
  );
};

const LoginPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-slate-200">
      <LoginForm />
    </div>
  );
};

export default LoginPage;
