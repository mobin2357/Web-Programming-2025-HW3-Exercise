import { useState, FormEvent } from "react";
import { useNavigate } from "react-router";
import styles from "./Login.module.css";
import { dummyCurrentUser, User } from "../data/UserTypes";
import axios, { AxiosError } from "axios";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleLogin = (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (!username || !password) {
      setError("enter username and password properly");
    } else {
      axios
        .post("http://localhost:8080/api/users/login", { username, password })
        .then((response) => {
          const user = response.data as User;
          dummyCurrentUser.username = user.username;
          dummyCurrentUser.password = user.password;
          setSuccess("success");
          navigate("/painter");
        })
        .catch((error: AxiosError<{ message: string }, unknown>) => {
          if (error.response) {
            setError(error.response.data?.message || "login error");
          } else if (error.request) {
            setError("server error");
          } else {
            setError("unknown error");
          }
        });
    }
  };

  return (
    <div className={styles.authLoginContainer}>
      <h2 className={styles.authLoginTitle}>Login</h2>
      <form className={styles.authLoginForm} onSubmit={handleLogin}>
        <input
          type="username"
          name="username"
          placeholder="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          name="password"
          placeholder="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {error && <p className={styles.authLoginError}>{error}</p>}
        {success && <p className={styles.authLoginSuccess}>{success}</p>}
        <button type="submit" className={styles.loginButton}>Login</button>
      </form>
    </div>
  );
}