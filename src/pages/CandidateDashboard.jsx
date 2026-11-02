
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  FiGrid, FiUser, FiFileText, FiBookmark, FiSettings,
  FiLogOut, FiSun, FiMoon, FiTrash2, FiEdit2, FiCheckCircle
} from "react-icons/fi";
import "../styles/CandidateDashboard.css";
import { jobs } from "../data/jobs";

const initialApplications = [
  { id: 1, role: "Frontend React Developer", company: "TechCorp Inc.", date: "Oct 28, 2026", status: "Interview" },
  { id: 2, role: "Junior UI Developer", company: "PixelCraft Studio", date: "Oct 25, 2026", status: "Under Review" },
  { id: 3, role: "React Developer", company: "BrightLabs", date: "Oct 20, 2026", status: "Applied" },
];

const initialSavedJobs = [
  { id: 101, title: "UI/UX Designer", company: "BrightLabs", location: "Hyderabad", salary: "₹4-6 LPA" },
  { id: 102, title: "Frontend Developer", company: "WebWorks", location: "Remote", salary: "₹5-8 LPA" },
];

function CandidateDashboard() {
  const navigate = useNavigate();
  const savedUser = JSON.parse(localStorage.getItem("currentUser") || "null");

  const [activeMenu, setActiveMenu] = useState("Overview");
  const [dark, setDark] = useState(false);
  const [rtl, setRtl] = useState(false);
  const [period, setPeriod] = useState("This Week");

  const [profile, setProfile] = useState(() => JSON.parse(localStorage.getItem("candidateProfile") || "null") || {
    name: savedUser?.name || "John Doe",
    email: savedUser?.email || "john@example.com",
    phone: "9876543210",
    location: "Hyderabad, India",
    headline: "Junior Frontend Developer",
    skills: "React, JavaScript, HTML, CSS",
    education: "B.Tech",
    experience: "Fresher"
  });

  const [applications, setApplications] = useState(() =>
    JSON.parse(localStorage.getItem("candidateApplications") || "null") || initialApplications
  );
  const [savedJobs, setSavedJobs] = useState(() =>
    JSON.parse(localStorage.getItem("candidateSavedJobs") || "null") || initialSavedJobs
  );

  const [tasks, setTasks] = useState([
    { id: 1, text: "Review system design notes", done: true },
    { id: 2, text: "Prepare behavioral interview answers", done: true },
    { id: 3, text: "Practice JavaScript coding problems", done: false },
    { id: 4, text: "Research companies before interviews", done: false },
    { id: 5, text: "Test webcam and microphone", done: false }
  ]);

  const [settings, setSettings] = useState({
    emailAlerts: true,
    jobAlerts: true,
    profileVisibility: true
  });

  const [editingProfile, setEditingProfile] = useState(false);

  const menuItems = [
    { name: "Overview", icon: <FiGrid /> },
    { name: "My Profile", icon: <FiUser /> },
    { name: "Applications", icon: <FiFileText /> },
    { name: "Saved Jobs", icon: <FiBookmark /> },
    { name: "Settings", icon: <FiSettings /> }
  ];

  const interviews = [
    { id: 1, company: "TechCorp Inc.", role: "Frontend React Developer", date: "Nov 05, 2026", time: "10:30 AM", type: "Technical Interview", status: "Confirmed" },
    { id: 2, company: "PixelCraft Studio", role: "Junior UI Developer", date: "Nov 08, 2026", time: "02:00 PM", type: "HR Interview", status: "Pending" }
  ];

  const activities = [
    { id: 1, title: "Application Submitted", description: "You applied for Frontend React Developer at TechCorp.", time: "2 hours ago" },
    { id: 2, title: "Profile Updated", description: "You updated your professional skills.", time: "Yesterday" },
    { id: 3, title: "Job Saved", description: "You saved UI/UX Designer at BrightLabs.", time: "2 days ago" }
  ];

  const skills = [
    { id: 1, name: "Advanced React", description: "Improve React hooks and component architecture.", level: "Intermediate", progress: 65 },
    { id: 2, name: "JavaScript ES6+", description: "Strengthen modern JavaScript concepts.", level: "Beginner", progress: 40 },
    { id: 3, name: "Node.js & Express", description: "Learn backend development and REST APIs.", level: "Beginner", progress: 25 }
  ];

  const chartData = period === "This Week"
    ? [35, 55, 40, 85, 60, 75, 45]
    : period === "This Month"
      ? [45, 65, 55, 90, 70, 80, 60]
      : [25, 45, 65, 50, 85, 70, 95];

  const updateApplications = (updated) => {
    setApplications(updated);
    localStorage.setItem("candidateApplications", JSON.stringify(updated));
  };

  const updateSavedJobs = (updated) => {
    setSavedJobs(updated);
    localStorage.setItem("candidateSavedJobs", JSON.stringify(updated));
  };

  const updateProfile = (e) => {
    e.preventDefault();
    localStorage.setItem("candidateProfile", JSON.stringify(profile));
    setEditingProfile(false);
    alert("Profile updated successfully!");
  };

  const toggleTask = (id) => {
    setTasks(old => old.map(task => task.id === id ? { ...task, done: !task.done } : task));
  };

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    localStorage.removeItem("candidateLogin");
    localStorage.removeItem("user");
    navigate("/");
  };

  const removeSavedJob = (id) => {
    updateSavedJobs(savedJobs.filter(job => job.id !== id));
  };

  const renderOverview = () => (
    <>
      <section className="candidate-stats">
        {[
          [applications.length, "Applications Sent", "green"],
          [interviews.length, "Interviews Scheduled", "teal"],
          [savedJobs.length, "Jobs Saved", "purple"],
          [5, "Profile Views", "yellow"]
        ].map(([number, label, color]) => (
          <div className="candidate-stat-card" key={label}>
            <h2 className={color}>{number}</h2><p>{label}</p>
          </div>
        ))}
      </section>

      <section className="candidate-panel checklist-panel">
        <h3>Interview Prep Checklist</h3>
        <div className="checklist-grid">
          {tasks.map(task => (
            <label className={`checklist-item ${task.done ? "task-completed" : ""}`} key={task.id}>
              <input type="checkbox" checked={task.done} onChange={() => toggleTask(task.id)} />
              <span>{task.text}</span>
            </label>
          ))}
        </div>
      </section>

      <section className="candidate-panel profile-chart-panel">
        <div className="chart-heading">
          <h3>Profile Views</h3>
          <select value={period} onChange={e => setPeriod(e.target.value)}>
            <option>This Week</option><option>This Month</option><option>This Year</option>
          </select>
        </div>
        <div className="candidate-chart">
          {chartData.map((height, i) => (
            <div className="chart-column" key={i}>
              <div className="chart-bar" style={{ height: `${height}%` }} title={`${height} views`} />
              <span>{["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"][i]}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="candidate-panel">
        <h3>Upcoming Interviews</h3>
        <p className="section-subtitle">Keep track of your scheduled interviews.</p>
        <div className="interview-list">
          {interviews.map(item => (
            <div className="interview-card" key={item.id}>
              <div className="interview-date-icon"><span>{item.date.split(" ")[0]}</span><strong>{item.date.split(" ")[1].replace(",", "")}</strong></div>
              <div className="interview-info"><h4>{item.role}</h4><p>{item.company}</p><span>{item.type}</span></div>
              <div className="interview-time"><strong>{item.time}</strong><span className={`interview-status ${item.status.toLowerCase()}`}>{item.status}</span></div>
            </div>
          ))}
        </div>
      </section>

      <section className="candidate-panel">
        <h3>Recent Activity</h3>
        <div className="activity-list">
          {activities.map(item => (
            <div className="activity-item" key={item.id}>
              <div className="activity-dot" />
              <div className="activity-info"><h4>{item.title}</h4><p>{item.description}</p><span>{item.time}</span></div>
            </div>
          ))}
        </div>
      </section>

      <section className="candidate-panel">
        <h3>Recommended Skill Upgrades</h3>
        <p className="section-subtitle">Improve your skills to increase job opportunities.</p>
        <div className="skill-grid">
          {skills.map(skill => (
            <div className="skill-card" key={skill.id}>
              <div className="skill-card-heading"><h4>{skill.name}</h4><span>{skill.level}</span></div>
              <p>{skill.description}</p>
              <div className="skill-progress-info"><span>Learning progress</span><strong>{skill.progress}%</strong></div>
              <div className="skill-progress-bar"><div style={{ width: `${skill.progress}%` }} /></div>
              <Link to="/services" className="skill-learn-link">Explore Courses →</Link>
            </div>
          ))}
        </div>
      </section>

      <section className="candidate-panel">
        <h3>Jobs Matching Your Profile</h3>
        <p className="section-subtitle">Recommended opportunities based on your skills.</p>
        <div className="matching-jobs-grid">
          {jobs.slice(0, 3).map(job => (
            <div className="matching-job-card" key={job.id}>
              <div className="matching-job-top"><div className="company-icon">{job.company?.charAt(0) || "C"}</div><span className="match-percentage">Recommended</span></div>
              <h4>{job.title}</h4><p className="matching-company">{job.company}</p>
              <div className="matching-job-details"><span>{job.location}</span><span>{job.salary}</span></div>
              <div className="matching-job-tags">{(job.tags || []).slice(0, 3).map(tag => <span key={tag}>{tag}</span>)}</div>
              <Link to={`/jobs/${job.id}`} className="matching-job-link">View Job Details →</Link>
            </div>
          ))}
        </div>
      </section>
    </>
  );

  const renderProfile = () => (
    <section className="candidate-panel">
      <div className="section-title-row">
        <div><h3>My Profile</h3><p className="section-subtitle">Manage your professional information.</p></div>
        <button className="section-action" onClick={() => setEditingProfile(!editingProfile)}>{editingProfile ? "Cancel" : "Edit Profile"}</button>
      </div>
      {editingProfile ? (
        <form className="dashboard-form" onSubmit={updateProfile}>
          {Object.entries(profile).map(([key, value]) => (
            <label key={key}>{key.charAt(0).toUpperCase() + key.slice(1)}
              <input value={value} onChange={e => setProfile({ ...profile, [key]: e.target.value })} required />
            </label>
          ))}
          <button type="submit" className="dashboard-primary-btn">Save Profile</button>
        </form>
      ) : (
        <div className="dashboard-details-grid">
          {Object.entries(profile).map(([key, value]) => (
            <div key={key}><small>{key}</small><strong>{value}</strong></div>
          ))}
        </div>
      )}
    </section>
  );

  const renderApplications = () => (
    <section className="candidate-panel">
      <h3>My Applications</h3>
      <p className="section-subtitle">Track the jobs you have applied for.</p>
      <div className="dashboard-table-wrap">
        <table className="dashboard-table">
          <thead><tr><th>Job Title</th><th>Company</th><th>Applied Date</th><th>Status</th><th>Action</th></tr></thead>
          <tbody>{applications.map(app => (
            <tr key={app.id}>
              <td>{app.role}</td><td>{app.company}</td><td>{app.date}</td>
              <td><span className="dashboard-status">{app.status}</span></td>
              <td><button className="dashboard-icon-btn" title="Remove application" onClick={() => updateApplications(applications.filter(x => x.id !== app.id))}><FiTrash2 /></button></td>
            </tr>
          ))}</tbody>
        </table>
        {applications.length === 0 && <p>No applications yet. Browse jobs to get started.</p>}
      </div>
      <Link to="/jobs" className="dashboard-primary-btn">Browse Jobs</Link>
    </section>
  );

  const renderSavedJobs = () => (
    <section className="candidate-panel">
      <h3>Saved Jobs</h3><p className="section-subtitle">Jobs you have bookmarked for later.</p>
      <div className="matching-jobs-grid">
        {savedJobs.map(job => (
          <div className="matching-job-card" key={job.id}>
            <h4>{job.title}</h4><p>{job.company}</p>
            <div className="matching-job-details"><span>{job.location}</span><span>{job.salary}</span></div>
            <div className="dashboard-action-row">
              <Link to="/jobs" className="dashboard-primary-btn">View Jobs</Link>
              <button className="dashboard-icon-btn" onClick={() => removeSavedJob(job.id)} title="Remove saved job"><FiTrash2 /></button>
            </div>
          </div>
        ))}
      </div>
      {savedJobs.length === 0 && <p>You have no saved jobs.</p>}
    </section>
  );

  const renderSettings = () => (
    <section className="candidate-panel">
      <h3>Account Settings</h3><p className="section-subtitle">Control your account preferences.</p>
      <div className="dashboard-settings">
        {[
          ["emailAlerts", "Receive email notifications"],
          ["jobAlerts", "Receive job recommendations"],
          ["profileVisibility", "Make my profile visible to employers"]
        ].map(([key, label]) => (
          <label key={key}><span>{label}</span><input type="checkbox" checked={settings[key]} onChange={e => setSettings({ ...settings, [key]: e.target.checked })} /></label>
        ))}
      </div>
      <button className="dashboard-primary-btn" onClick={() => { localStorage.setItem("candidateSettings", JSON.stringify(settings)); alert("Settings saved!"); }}>Save Settings</button>
    </section>
  );

  const pageContent = {
    Overview: renderOverview,
    "My Profile": renderProfile,
    Applications: renderApplications,
    "Saved Jobs": renderSavedJobs,
    Settings: renderSettings
  };

  return (
    <div className={`candidate-dashboard ${dark ? "dashboard-dark" : ""}`} dir={rtl ? "rtl" : "ltr"}>
      <aside className="candidate-sidebar">
        <div className="candidate-brand"><h2>Recruit<span>Pro</span>.</h2><p>CANDIDATE PORTAL</p></div>
        <nav className="candidate-navigation">
          {menuItems.map(item => (
            <button key={item.name} className={`candidate-nav-link ${activeMenu === item.name ? "active" : ""}`} onClick={() => setActiveMenu(item.name)}>
              {item.icon}<span>{item.name}</span>
            </button>
          ))}
        </nav>
        <div className="candidate-tools">
          <button onClick={() => setRtl(!rtl)}>RTL</button>
          <button onClick={() => setDark(!dark)}>{dark ? <FiMoon /> : <FiSun />}</button>
        </div>
        <div className="candidate-sidebar-bottom">
          <div className="profile-completion"><div className="progress-circle"><span /></div><div><strong>Profile: 80%</strong><p>Complete now</p></div></div>
          <button className="candidate-logout" onClick={handleLogout}><FiLogOut />Logout</button>
        </div>
      </aside>

      <main className="candidate-main">
        <header className="candidate-header">
          <div><h1>{activeMenu}</h1><p>{activeMenu === "Overview" ? "Here's an overview of your job search activity." : `Manage your ${activeMenu.toLowerCase()} information.`}</p></div>
          <div className="candidate-user"><div><strong>{profile.name}</strong><span>Candidate</span></div><div className="candidate-avatar">{profile.name.split(" ").map(x => x[0]).join("").slice(0, 2).toUpperCase()}</div></div>
        </header>
        <div className="candidate-content">{pageContent[activeMenu]()}</div>
      </main>
    </div>
  );
}

export default CandidateDashboard;
