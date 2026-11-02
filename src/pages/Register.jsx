
import { Link } from "react-router-dom";

function Register() {
  const handleRegister = (e) => {
    e.preventDefault();
    alert("Demo registration. No backend is connected.");
  };

  return (
    <section className="auth-section">

      <form className="auth-card" onSubmit={handleRegister}>

        <h1>Create Account</h1>
        <p>Join RecruitPro today.</p>

        <label>
          Full Name
          <input required placeholder="Your name" />
        </label>

        <label>
          Email
          <input type="email" required placeholder="Email address" />
        </label>

        <label>
          Password
          <input type="password" required placeholder="Password" />
        </label>

        <label>
          Account Type
          <select>
            <option>Candidate</option>
            <option>Employer</option>
          </select>
        </label>

        <button className="primary-btn full">
          Register
        </button>

        <p>
          Already registered?
          <Link to="/login"> Login</Link>
        </p>

      </form>

    </section>
  );
}

export default Register;
