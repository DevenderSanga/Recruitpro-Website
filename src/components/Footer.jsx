
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="footer">

      <div className="container footer-grid">

        <div>
          <Link to="/" className="logo footer-logo">
            Recruit<span>Pro</span>.
          </Link>

          <p>
            Connecting talented people with great career opportunities.
          </p>
        </div>

        <div>
          <h3>Explore</h3>
          <Link to="/jobs">Find Jobs</Link>
          <Link to="/services">Services</Link>
          <Link to="/about">About Us</Link>
        </div>

        <div>
          <h3>Portals</h3>
          <Link to="/candidate-dashboard">Candidate Portal</Link>
          <Link to="/employer-dashboard">Employer Portal</Link>
          <Link to="/register">Register</Link>
        </div>

        <div>
          <h3>Contact</h3>
          <p>hello@recruitpro.example</p>
          <p>+91 98765 43210</p>
        </div>

      </div>

      <div className="copyright">
        © {new Date().getFullYear()} RecruitPro. All rights reserved.
      </div>

    </footer>
  );
}

export default Footer;
