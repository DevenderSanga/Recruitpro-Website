
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { FiSearch, FiBriefcase, FiMapPin } from "react-icons/fi";
import { jobs } from "../data/jobs";

function Home() {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  return (
    <>
      <section className="hero">
        <div className="container hero-grid">

          <div>
            <span className="eyebrow">
              YOUR CAREER, YOUR FUTURE
            </span>

            <h1>
              Find a job that <em>fits your life.</em>
            </h1>

            <p className="lead">
              Discover opportunities, connect with great
              companies and take the next step in your career.
            </p>

            <form
              className="search-box"
              onSubmit={(e) => {
                e.preventDefault();
                navigate(`/jobs?q=${encodeURIComponent(search)}`);
              }}
            >
              <FiSearch />

              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Job title, keyword or company"
              />

              <button type="submit">Search Jobs</button>
            </form>

            <p className="muted">
              12,000+ candidates exploring new opportunities
            </p>
          </div>

          <div className="hero-art">
            <div className="hero-icon">
              <FiBriefcase />
            </div>
            <div className="floating-card">
              ✓ Application sent!
            </div>
          </div>

        </div>
      </section>

      <section className="stats container">
        <div><strong>12k+</strong><span>Active candidates</span></div>
        <div><strong>3.5k+</strong><span>Open positions</span></div>
        <div><strong>850+</strong><span>Partner companies</span></div>
        <div><strong>92%</strong><span>Success rate</span></div>
      </section>

      <section className="section container">

        <div className="section-heading">
          <span className="eyebrow">LATEST OPPORTUNITIES</span>
          <h2>Featured Job Openings</h2>
          <p>Explore opportunities from leading companies.</p>
        </div>

        <div className="job-grid">

          {jobs.slice(0, 3).map((job) => (
            <div className="job-card" key={job.id}>

              <div className="company-icon">
                {job.company[0]}
              </div>

              <h3>{job.title}</h3>
              <p>{job.company}</p>

              <div className="job-meta">
                <span><FiMapPin /> {job.location}</span>
                <span>{job.salary}</span>
              </div>

              <div className="tags">
                {job.tags.map((tag) => (
                  <span key={tag}>{tag}</span>
                ))}
              </div>

              <Link to={`/jobs/${job.id}`} className="job-link">
                View Details →
              </Link>

            </div>
          ))}

        </div>

        <div className="center">
          <Link to="/jobs" className="outline-btn">
            Explore All Jobs →
          </Link>
        </div>

      </section>

      <section className="cta container">
        <div>
          <h2>Make your next career move count.</h2>
          <p>Create your profile and explore new opportunities.</p>
        </div>

        <Link to="/register" className="light-btn">
          Get Started →
        </Link>
      </section>
    </>
  );
}

export default Home;
