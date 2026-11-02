
import { Link } from "react-router-dom";

function About() {
  return (
    <>
      <section className="page-hero">
        <h1>About RecruitPro</h1>
        <p>Good people. Great opportunities.</p>
      </section>

      <section className="container section about-content">

        <div>
          <span className="eyebrow">OUR PURPOSE</span>

          <h2>
            Making meaningful work connections simpler.
          </h2>

          <p>
            RecruitPro helps candidates discover job
            opportunities and employers connect with
            talented professionals.
          </p>

          <p>
            Our goal is to make the recruitment experience
            simple, accessible and efficient.
          </p>

          <Link to="/jobs" className="primary-btn">
            Explore Jobs →
          </Link>
        </div>

        <div className="about-art">
          RecruitPro
        </div>

      </section>
    </>
  );
}

export default About;
