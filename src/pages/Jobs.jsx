
import { useMemo, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import { jobs } from "../data/jobs";

function Jobs() {
  const location = useLocation();

  const [search, setSearch] = useState(
    new URLSearchParams(location.search).get("q") || ""
  );

  const [category, setCategory] = useState("All");

  const filteredJobs = useMemo(() => {
    return jobs.filter((job) => {
      const matchesSearch = (
        job.title +
        job.company +
        job.location +
        job.tags.join(" ")
      ).toLowerCase().includes(search.toLowerCase());

      const matchesCategory =
        category === "All" || job.category === category;

      return matchesSearch && matchesCategory;
    });
  }, [search, category]);

  return (
    <>
      <section className="page-hero">
        <h1>Explore Opportunities</h1>
        <p>Find your next career opportunity.</p>
      </section>

      <section className="container section">

        <div className="filters">

          <input
            placeholder="Search jobs..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="All">All Categories</option>
            <option value="Technology">Technology</option>
            <option value="Design">Design</option>
            <option value="Marketing">Marketing</option>
            <option value="Business">Business</option>
          </select>

        </div>

        <p className="muted">
          {filteredJobs.length} jobs found
        </p>

        <div className="job-grid">

          {filteredJobs.map((job) => (
            <div className="job-card" key={job.id}>

              <div className="company-icon">
                {job.company[0]}
              </div>

              <h3>{job.title}</h3>
              <p>{job.company}</p>

              <p>{job.location}</p>
              <p>{job.salary}</p>

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

        {filteredJobs.length === 0 && (
          <p>No jobs found. Try another search.</p>
        )}

      </section>
    </>
  );
}

export default Jobs;
