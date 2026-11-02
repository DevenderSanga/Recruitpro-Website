
import { Link } from "react-router-dom";

function Login() {
  const handleLogin = (e) => {
    e.preventDefault();
    alert("Demo login. No authentication backend is connected.");
  };

  return (
    <section className="auth-section">

      <form className="auth-card" onSubmit={handleLogin}>

        <h1>Welcome Back</h1>
        <p>Login to your RecruitPro account.</p>

        <label>
          Email
          <input type="email" required placeholder="Email address" />
        </label>

        <label>
          Password
          <input type="password" required placeholder="Password" />
        </label>

        <button className="primary-btn full">
          Login
        </button>

        <p>
          Don't have an account?
          <Link to="/register"> Register</Link>
        </p>

      </form>

    </section>
  );
}

export default Login;
