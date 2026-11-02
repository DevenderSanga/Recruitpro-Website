
import { Link, useParams } from "react-router-dom";
import { jobs } from "../data/jobs";

function JobDetails() {
  const { id } = useParams();

  const job = jobs.find((item) => String(item.id) === id);

  if (!job) {
    return (
      <div className="page-hero">
        <h1>Job Not Found</h1>
        <Link to="/jobs">Browse Jobs</Link>
      </div>
    );
  }

  return (
    <section className="container section detail-layout">

      <div className="job-card">

        <Link to="/jobs">← Back to Jobs</Link>

        <div className="company-icon">
          {job.company[0]}
        </div>

        <h1>{job.title}</h1>
        <h3>{job.company}</h3>

        <p>{job.location}</p>
        <p>{job.salary}</p>
        <p>{job.type}</p>

        <hr />

        <h2>About This Job</h2>
        <p>{job.description}</p>

        <h2>Required Skills</h2>

        <div className="tags">
          {job.tags.map((tag) => (
            <span key={tag}>{tag}</span>
          ))}
        </div>

      </div>

      <aside className="job-card">
        <h3>Ready to Apply?</h3>

        <p>
          Apply for this opportunity and take your next
          career step.
        </p>

        <Link to="/login" className="primary-btn full">
          Apply Now
        </Link>

        <small className="muted">
          Demo only: application submission is not connected
          to a backend.
        </small>
      </aside>

    </section>
  );
}

export default JobDetails;
