import { type FormEvent, useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { login } from "../store/authSlice";

export default function LoginPage() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { token, loading, error } = useAppSelector((s) => s.auth);

  // 🔥 Token detect → direct HOME page
  useEffect(() => {
    if (token) navigate("/home", { replace: true });
  }, [token]);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleLogin(e: FormEvent) {
    e.preventDefault();
    dispatch(login({ email, password }));
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-blue-50 to-slate-200">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
        
        <h1 className="text-2xl font-bold text-blue-600 text-center mb-4">
          Welcome ✈
        </h1>

        <form onSubmit={handleLogin} className="space-y-3">
          <input 
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border px-3 py-2 rounded-lg"
            required
          />

          <input 
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border px-3 py-2 rounded-lg"
            required
          />

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 bg-blue-600 text-white rounded-lg text-sm font-semibold hover:bg-blue-700"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        {/* Signup Navigation 🔥 */}
        <p className="text-sm text-center text-slate-600 mt-3">
          New here?
          <Link to="/signup" className="text-blue-600 font-semibold ml-1 underline">
            Create Account
          </Link>
        </p>
      </div>
    </div>
  );
}
