
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FiGrid, FiBriefcase, FiUsers, FiPlusCircle, FiUser, FiSettings,
  FiLogOut, FiSun, FiMoon, FiCalendar, FiCheckCircle, FiClock,
  FiActivity, FiTrash2, FiEdit2
} from "react-icons/fi";
import "../styles/EmployerDashboard.css";

const initialJobs = [
  { id: 1, title: "Frontend React Developer", department: "Engineering", location: "Hyderabad", type: "Full-time", salary: "₹5-8 LPA", status: "Active" },
  { id: 2, title: "UI/UX Designer", department: "Design", location: "Remote", type: "Full-time", salary: "₹4-6 LPA", status: "Active" },
  { id: 3, title: "Node.js Developer", department: "Engineering", location: "Bangalore", type: "Contract", salary: "₹6-9 LPA", status: "Paused" }
];

const initialApplicants = [
  { id: 1, name: "Sarah Johnson", email: "sarah@example.com", job: "Frontend React Developer", experience: "3 years", date: "Oct 28, 2026", status: "Applied" },
  { id: 2, name: "Michael Smith", email: "michael@example.com", job: "UI/UX Designer", experience: "4 years", date: "Oct 27, 2026", status: "Shortlisted" },
  { id: 3, name: "Emily Davis", email: "emily@example.com", job: "Node.js Developer", experience: "2 years", date: "Oct 26, 2026", status: "Interview" },
  { id: 4, name: "David Wilson", email: "david@example.com", job: "Frontend React Developer", experience: "5 years", date: "Oct 24, 2026", status: "Applied" }
];

function EmployerDashboard() {
  const navigate = useNavigate();
  const savedUser = JSON.parse(localStorage.getItem("currentUser") || "null");

  const [activeMenu, setActiveMenu] = useState("Overview");
  const [dark, setDark] = useState(false);
  const [rtl, setRtl] = useState(false);

  const [company, setCompany] = useState(() =>
    JSON.parse(localStorage.getItem("employerCompany") || "null") || {
      name: savedUser?.company || "Quantum",
      email: savedUser?.email || "hr@quantum.com",
      website: "www.quantum.com",
      industry: "Information Technology",
      location: "Hyderabad, India",
      description: "We build modern digital products and technology solutions."
    }
  );

  const [jobList, setJobList] = useState(() =>
    JSON.parse(localStorage.getItem("employerJobs") || "null") || initialJobs
  );

  const [applicants, setApplicants] = useState(() =>
    JSON.parse(localStorage.getItem("employerApplicants") || "null") || initialApplicants
  );

  const [jobForm, setJobForm] = useState({
    title: "", department: "", location: "", type: "Full-time", salary: "", status: "Active"
  });

  const [editingJob, setEditingJob] = useState(null);
  const [settings, setSettings] = useState({
    emailNotifications: true,
    newApplicantAlerts: true,
    interviewReminders: true
  });

  const menuItems = [
    { name: "Overview", icon: <FiGrid /> },
    { name: "Manage Jobs", icon: <FiBriefcase /> },
    { name: "Applicants", icon: <FiUsers /> },
    { name: "Post a Job", icon: <FiPlusCircle /> },
    { name: "Company Profile", icon: <FiUser /> },
    { name: "Settings", icon: <FiSettings /> }
  ];

  const interviews = [
    { id: 1, name: "Sarah Johnson", role: "Frontend React Developer", time: "10:30 AM", type: "Technical Round", status: "Confirmed", initials: "SJ" },
    { id: 2, name: "Michael Smith", role: "UI/UX Designer", time: "12:00 PM", type: "Portfolio Review", status: "Confirmed", initials: "MS" },
    { id: 3, name: "Emily Davis", role: "Node.js Developer", time: "02:30 PM", type: "HR Round", status: "Pending", initials: "ED" }
  ];

  const activities = [
    { id: 1, title: "New Application Received", description: "Sarah Johnson applied for Frontend React Developer.", time: "10 minutes ago" },
    { id: 2, title: "Candidate Shortlisted", description: "Michael Smith was shortlisted for UI/UX Designer.", time: "1 hour ago" },
    { id: 3, title: "Interview Scheduled", description: "An interview was scheduled with Emily Davis.", time: "3 hours ago" },
    { id: 4, title: "New Job Published", description: "Node.js Developer job posting is now active.", time: "Yesterday" }
  ];

  const pipeline = [
    { name: "Applied", count: applicants.filter(a => a.status === "Applied").length, color: "#4389d8" },
    { name: "Shortlisted", count: applicants.filter(a => a.status === "Shortlisted").length, color: "#8b6bc1" },
    { name: "Interview", count: applicants.filter(a => a.status === "Interview").length, color: "#e5a33b" },
    { name: "Hired", count: applicants.filter(a => a.status === "Hired").length, color: "#197653" }
  ];

  const saveJobs = updated => {
    setJobList(updated);
    localStorage.setItem("employerJobs", JSON.stringify(updated));
  };

  const saveApplicants = updated => {
    setApplicants(updated);
    localStorage.setItem("employerApplicants", JSON.stringify(updated));
  };

  const handleJobSubmit = e => {
    e.preventDefault();

    if (editingJob) {
      saveJobs(jobList.map(job => job.id === editingJob ? { ...jobForm, id: editingJob } : job));
      setEditingJob(null);
    } else {
      saveJobs([{ ...jobForm, id: Date.now() }, ...jobList]);
    }

    setJobForm({ title: "", department: "", location: "", type: "Full-time", salary: "", status: "Active" });
    setActiveMenu("Manage Jobs");
    alert(editingJob ? "Job updated successfully!" : "Job posted successfully!");
  };

  const editJob = job => {
    setJobForm({ title: job.title, department: job.department, location: job.location, type: job.type, salary: job.salary, status: job.status });
    setEditingJob(job.id);
    setActiveMenu("Post a Job");
  };

  const deleteJob = id => {
    if (window.confirm("Are you sure you want to delete this job?")) {
      saveJobs(jobList.filter(job => job.id !== id));
    }
  };

  const updateApplicantStatus = (id, status) => {
    saveApplicants(applicants.map(app => app.id === id ? { ...app, status } : app));
  };

  const saveCompany = e => {
    e.preventDefault();
    localStorage.setItem("employerCompany", JSON.stringify(company));
    alert("Company profile saved successfully!");
  };

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    localStorage.removeItem("employerLogin");
    localStorage.removeItem("user");
    navigate("/");
  };

  const renderOverview = () => (
    <>
      <section className="employer-stats">
        {[
          [jobList.filter(j => j.status === "Active").length, "Active Jobs", <FiBriefcase />, "green"],
          [applicants.length, "Total Applicants", <FiUsers />, "blue"],
          [applicants.filter(a => a.status === "Shortlisted").length, "Shortlisted", <FiCheckCircle />, "purple"],
          [interviews.length, "Interviews", <FiCalendar />, "orange"]
        ].map(([number, label, icon, color]) => (
          <div className="employer-stat-card" key={label}>
            <div className={`employer-stat-icon ${color}`}>{icon}</div>
            <div><h2>{number}</h2><p>{label}</p></div>
          </div>
        ))}
      </section>

      <section className="employer-panel">
        <div className="employer-section-heading"><div><h3>Hiring Pipeline</h3><p>Track candidates across recruitment stages.</p></div><span className="employer-total">{applicants.length} Candidates</span></div>
        <div className="pipeline-grid">
          {pipeline.map(stage => (
            <div className="pipeline-card" key={stage.name}>
              <div className="pipeline-card-top"><span>{stage.name}</span><strong>{stage.count}</strong></div>
              <div className="pipeline-track"><div style={{ width: `${applicants.length ? stage.count / applicants.length * 100 : 0}%`, background: stage.color }} /></div>
              <small>Candidates</small>
            </div>
          ))}
        </div>
      </section>

      <section className="employer-panel">
        <div className="employer-section-heading"><div><h3>Scheduled Interviews Today</h3><p>Manage today's candidate interviews.</p></div><span className="employer-total">{interviews.length} Interviews</span></div>
        <div className="employer-interview-list">
          {interviews.map(item => (
            <div className="employer-interview-card" key={item.id}>
              <div className="interview-avatar">{item.initials}</div>
              <div className="employer-interview-info"><h4>{item.name}</h4><p>{item.role}</p><span>{item.type}</span></div>
              <div className="employer-interview-time"><strong><FiClock /> {item.time}</strong><span className={`employer-interview-status ${item.status.toLowerCase()}`}>{item.status}</span></div>
            </div>
          ))}
        </div>
      </section>

      <section className="employer-panel">
        <div className="employer-section-heading"><div><h3>Recent Activity</h3><p>Latest updates from your recruitment process.</p></div><FiActivity /></div>
        <div className="employer-activity-list">
          {activities.map(item => (
            <div className="employer-activity-item" key={item.id}><div className="employer-activity-dot" /><div><h4>{item.title}</h4><p>{item.description}</p><span>{item.time}</span></div></div>
          ))}
        </div>
      </section>
    </>
  );

  const renderJobs = () => (
    <section className="employer-panel">
      <div className="employer-section-heading">
        <div><h3>Manage Jobs</h3><p>Create, edit and manage your job openings.</p></div>
        <button className="dashboard-primary-btn" onClick={() => { setEditingJob(null); setJobForm({ title: "", department: "", location: "", type: "Full-time", salary: "", status: "Active" }); setActiveMenu("Post a Job"); }}> <FiPlusCircle /> Post a Job</button>
      </div>
      <div className="dashboard-table-wrap">
        <table className="dashboard-table">
          <thead><tr><th>Job Title</th><th>Department</th><th>Location</th><th>Type</th><th>Status</th><th>Actions</th></tr></thead>
          <tbody>{jobList.map(job => (
            <tr key={job.id}>
              <td><strong>{job.title}</strong><small className="table-subtext">{job.salary}</small></td>
              <td>{job.department}</td><td>{job.location}</td><td>{job.type}</td>
              <td><span className="dashboard-status">{job.status}</span></td>
              <td><div className="dashboard-action-row">
                <button className="dashboard-icon-btn" title="Edit job" onClick={() => editJob(job)}><FiEdit2 /></button>
                <button className="dashboard-icon-btn" title="Delete job" onClick={() => deleteJob(job.id)}><FiTrash2 /></button>
                <button className="dashboard-icon-btn" title="Change status" onClick={() => saveJobs(jobList.map(j => j.id === job.id ? { ...j, status: j.status === "Active" ? "Paused" : "Active" } : j))}>{job.status === "Active" ? "Pause" : "Activate"}</button>
              </div></td>
            </tr>
          ))}</tbody>
        </table>
        {jobList.length === 0 && <p>No jobs posted yet. Create your first job opening.</p>}
      </div>
    </section>
  );

  const renderApplicants = () => (
    <section className="employer-panel">
      <h3>Applicants</h3><p className="section-subtitle">Review candidates and update their application status.</p>
      <div className="dashboard-table-wrap">
        <table className="dashboard-table">
          <thead><tr><th>Candidate</th><th>Applied For</th><th>Experience</th><th>Date</th><th>Status</th></tr></thead>
          <tbody>{applicants.map(app => (
            <tr key={app.id}>
              <td><strong>{app.name}</strong><small className="table-subtext">{app.email}</small></td>
              <td>{app.job}</td><td>{app.experience}</td><td>{app.date}</td>
              <td><select value={app.status} onChange={e => updateApplicantStatus(app.id, e.target.value)}>
                <option>Applied</option><option>Shortlisted</option><option>Interview</option><option>Hired</option><option>Rejected</option>
              </select></td>
            </tr>
          ))}</tbody>
        </table>
        {applicants.length === 0 && <p>No applicants yet.</p>}
      </div>
    </section>
  );

  const renderPostJob = () => (
    <section className="employer-panel">
      <h3>{editingJob ? "Edit Job" : "Post a New Job"}</h3>
      <p className="section-subtitle">Provide the details of the job opening.</p>
      <form className="dashboard-form" onSubmit={handleJobSubmit}>
        <label>Job Title<input required value={jobForm.title} onChange={e => setJobForm({ ...jobForm, title: e.target.value })} placeholder="e.g. React Developer" /></label>
        <label>Department<input required value={jobForm.department} onChange={e => setJobForm({ ...jobForm, department: e.target.value })} placeholder="e.g. Engineering" /></label>
        <label>Location<input required value={jobForm.location} onChange={e => setJobForm({ ...jobForm, location: e.target.value })} placeholder="e.g. Hyderabad / Remote" /></label>
        <label>Job Type<select value={jobForm.type} onChange={e => setJobForm({ ...jobForm, type: e.target.value })}><option>Full-time</option><option>Part-time</option><option>Contract</option><option>Internship</option><option>Remote</option></select></label>
        <label>Salary Range<input required value={jobForm.salary} onChange={e => setJobForm({ ...jobForm, salary: e.target.value })} placeholder="e.g. ₹5-8 LPA" /></label>
        <label>Status<select value={jobForm.status} onChange={e => setJobForm({ ...jobForm, status: e.target.value })}><option>Active</option><option>Paused</option></select></label>
        <div className="dashboard-form-actions"><button className="dashboard-primary-btn" type="submit">{editingJob ? "Update Job" : "Publish Job"}</button><button type="button" className="dashboard-secondary-btn" onClick={() => { setEditingJob(null); setActiveMenu("Manage Jobs"); }}>Cancel</button></div>
      </form>
    </section>
  );

  const renderCompany = () => (
    <section className="employer-panel">
      <h3>Company Profile</h3><p className="section-subtitle">Update the information candidates see about your company.</p>
      <form className="dashboard-form" onSubmit={saveCompany}>
        {Object.entries(company).map(([key, value]) => (
          <label key={key}>{key.charAt(0).toUpperCase() + key.slice(1)}
            {key === "description"
              ? <textarea rows="4" value={value} onChange={e => setCompany({ ...company, [key]: e.target.value })} required />
              : <input value={value} onChange={e => setCompany({ ...company, [key]: e.target.value })} required />}
          </label>
        ))}
        <button className="dashboard-primary-btn" type="submit">Save Company Profile</button>
      </form>
    </section>
  );

  const renderSettings = () => (
    <section className="employer-panel">
      <h3>Employer Settings</h3><p className="section-subtitle">Manage recruitment notifications and preferences.</p>
      <div className="dashboard-settings">
        {[
          ["emailNotifications", "Receive email notifications"],
          ["newApplicantAlerts", "Notify me about new applicants"],
          ["interviewReminders", "Send interview reminders"]
        ].map(([key, label]) => (
          <label key={key}><span>{label}</span><input type="checkbox" checked={settings[key]} onChange={e => setSettings({ ...settings, [key]: e.target.checked })} /></label>
        ))}
      </div>
      <button className="dashboard-primary-btn" onClick={() => { localStorage.setItem("employerSettings", JSON.stringify(settings)); alert("Settings saved!"); }}>Save Settings</button>
    </section>
  );

  const pageContent = {
    Overview: renderOverview,
    "Manage Jobs": renderJobs,
    Applicants: renderApplicants,
    "Post a Job": renderPostJob,
    "Company Profile": renderCompany,
    Settings: renderSettings
  };

  return (
    <div className={`employer-dashboard ${dark ? "employer-dark" : ""}`} dir={rtl ? "rtl" : "ltr"}>
      <aside className="employer-sidebar">
        <div className="employer-brand"><h2>Recruit<span>Pro</span>.</h2><p>EMPLOYER PORTAL</p></div>
        <nav className="employer-navigation">
          {menuItems.map(item => (
            <button key={item.name} className={`employer-nav-link ${activeMenu === item.name ? "active" : ""}`} onClick={() => setActiveMenu(item.name)}>
              {item.icon}<span>{item.name}</span>
            </button>
          ))}
        </nav>
        <div className="employer-tools">
          <button onClick={() => setRtl(!rtl)}>RTL</button>
          <button onClick={() => setDark(!dark)}>{dark ? <FiMoon /> : <FiSun />}</button>
        </div>
        <div className="employer-sidebar-bottom">
          <div className="employer-company"><div className="company-avatar">{company.name.slice(0, 2).toUpperCase()}</div><div><strong>{company.name}</strong><p>Employer Account</p></div></div>
          <button className="employer-logout" onClick={handleLogout}><FiLogOut />Logout</button>
        </div>
      </aside>

      <main className="employer-main">
        <header className="employer-header">
          <div><h1>{activeMenu}</h1><p>{activeMenu === "Overview" ? "Welcome back! Here's your recruitment overview." : `Manage your ${activeMenu.toLowerCase()} information.`}</p></div>
          <div className="employer-user"><div><strong>{company.name}</strong><span>Employer</span></div><div className="employer-avatar">{company.name.slice(0, 2).toUpperCase()}</div></div>
        </header>
        <div className="employer-content">{pageContent[activeMenu]()}</div>
      </main>
    </div>
  );
}

export default EmployerDashboard;
