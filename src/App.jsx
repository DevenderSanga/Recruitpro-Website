
import { Routes, Route, Outlet } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import Home2 from "./pages/Home2";
import Jobs from "./pages/Jobs";
import JobDetails from "./pages/JobDetails";
import Services from "./pages/Services";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import Register from "./pages/Register";
import CandidateDashboard from "./pages/CandidateDashboard";
import EmployerDashboard from "./pages/EmployerDashboard";

// Layout for public website pages
function PublicLayout() {
  return (
    <>
      <Navbar />

      <main>
        <Outlet />
      </main>

      <Footer />
    </>
  );
}

// 404 Page
function NotFound() {
  return (
    <section className="page-hero">
      <h1>404 - Page Not Found</h1>
      <p>The page you are looking for does not exist.</p>
    </section>
  );
}

function App() {
  return (
    <Routes>

      {/* Public Website Layout - Navbar + Footer */}
      <Route element={<PublicLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/home-2" element={<Home2 />} />

        <Route path="/jobs" element={<Jobs />} />
        <Route path="/jobs/:id" element={<JobDetails />} />

        <Route path="/services" element={<Services />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
      </Route>

      {/* Candidate Portal - No Navbar or Footer */}

      <Route
        path="/login"
        element={<Login />}
      />

      <Route
        path="/register"
        element={<Register />}
      />
      <Route
        path="/candidate-dashboard"
        element={<CandidateDashboard />}
      />

      {/* Employer Portal - No Navbar or Footer */}
      <Route
        path="/employer-dashboard"
        element={<EmployerDashboard />}
      />

      {/* 404 Page */}
      <Route path="*" element={<NotFound />} />

    </Routes>
  );
}

export default App;
