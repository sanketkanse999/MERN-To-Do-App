import { useState } from "react";
import { useNavigate, Link } from "react-router-dom"; // ✅ Link imported
import { toast } from "react-toastify";
import API from "../services/api";

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.email || !form.password) {
      toast.error("All fields are required!");
      return;
    }

    setLoading(true);
    try {
      const res = await API.post("/auth/login", form);
      localStorage.setItem("token", res.data.token);
      toast.success("Login successful!");
      navigate("/");
    } catch (err) {
      toast.error(err.response?.data?.message || "Login failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <form onSubmit={handleSubmit} style={styles.form}>
        <h2 style={styles.heading}>Login</h2>

        <input
          name="email"
          type="email"
          placeholder="Email"
          onChange={handleChange}
          style={styles.input}
          required
        />

        <input
          name="password"
          type="password"
          placeholder="Password"
          onChange={handleChange}
          style={styles.input}
          required
        />

        <button type="submit" style={styles.button} disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>

        <p style={{ textAlign: "center", marginTop: 12 }}>
          Don't have an account?{" "}
          <Link to="/register" style={styles.link}>Register here</Link>
        </p>
      </form>
    </div>
  );
};

const styles = {
  container: {
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "#f4f4f4",
  },
  form: {
    width: "100%",
    maxWidth: 400,
    padding: 30,
    backgroundColor: "#fff",
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
    borderRadius: 10,
    display: "flex",
    flexDirection: "column",
    gap: 15,
  },
  heading: {
    textAlign: "center",
    marginBottom: 10,
  },
  input: {
    padding: "10px 14px",
    borderRadius: 6,
    border: "1px solid #ccc",
    fontSize: 14,
  },
  button: {
    padding: "10px 14px",
    border: "none",
    borderRadius: 6,
    backgroundColor: "#007bff",
    color: "#fff",
    fontSize: 16,
    cursor: "pointer",
  },
  link: {
    color: "#007bff",
    textDecoration: "none",
    fontWeight: 500,
  },
};

export default Login;
