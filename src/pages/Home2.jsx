import { Link } from "react-router-dom";
import { jobs } from "../data/jobs";

function Home2() {
  return (
    <>
      <section className="page-hero">
        <span className="eyebrow">WELCOME TO RECRUITPRO</span>
        <h1>Discover Your Dream Career</h1>
        <p>Find the right opportunity and build your future.</p>

        <Link to="/jobs" className="primary-btn">
          Browse All Jobs
        </Link>
      </section>

      <section className="container section">
        <div className="section-heading">
          <h2>Explore Latest Jobs</h2>
          <p>Find opportunities from leading companies.</p>
        </div>

        <div className="job-grid">
          {jobs.map((job) => (
            <div className="job-card" key={job.id}>
              <div className="company-icon">
                {job.company[0]}
              </div>

              <h3>{job.title}</h3>
              <p>{job.company}</p>
              <p>{job.location}</p>
              <strong>{job.salary}</strong>

              <Link
                to={`/jobs/${job.id}`}
                className="job-link"
              >
                View Details →
              </Link>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}

export default Home2;