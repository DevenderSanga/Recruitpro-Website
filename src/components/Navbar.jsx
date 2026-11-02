
import { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import {
    FiMenu,
    FiX,
    FiChevronDown,
    FiSun,
    FiMoon
} from "react-icons/fi";

function Navbar() {
    const [menuOpen, setMenuOpen] = useState(false);
    const [dashboardOpen, setDashboardOpen] = useState(false);

    const [dark, setDark] = useState(
        localStorage.getItem("theme") === "dark"
    );

    const [rtl, setRtl] = useState(
        localStorage.getItem("rtl") === "true"
    );

    useEffect(() => {
        document.documentElement.dataset.theme = dark ? "dark" : "light";
        localStorage.setItem("theme", dark ? "dark" : "light");
    }, [dark]);

    useEffect(() => {
        document.documentElement.dir = rtl ? "rtl" : "ltr";
        localStorage.setItem("rtl", String(rtl));
    }, [rtl]);

    const closeMenu = () => {
        setMenuOpen(false);
        setDashboardOpen(false);
    };

    return (
        <header className="navbar">
            <div className="nav-container">

                <Link to="/" className="logo" onClick={closeMenu}>
                    Recruit<span>Pro</span>.
                </Link>

                <button
                    className="menu-toggle"
                    onClick={() => setMenuOpen(!menuOpen)}
                >
                    {menuOpen ? <FiX /> : <FiMenu />}
                </button>

                <nav className={`nav-links ${menuOpen ? "show" : ""}`}>

                    <div className="home-dropdown">
                        <button className="home-dropdown-btn">
                            Home <FiChevronDown />
                        </button>

                        <div className="home-dropdown-menu">
                            <Link to="/" onClick={closeMenu}>
                                Home 1 (Default)
                            </Link>

                            <Link to="/home-2" onClick={closeMenu}>
                                Home 2
                            </Link>
                        </div>
                    </div>
                    <NavLink to="/jobs" onClick={closeMenu}>
                        Jobs
                    </NavLink>

                    <NavLink to="/services" onClick={closeMenu}>
                        Services
                    </NavLink>

                    <NavLink to="/about" onClick={closeMenu}>
                        About Us
                    </NavLink>

                    <NavLink to="/contact" onClick={closeMenu}>
                        Contact
                    </NavLink>

                    <div className="dashboard-dropdown">

                        <button
                            onClick={() => setDashboardOpen(!dashboardOpen)}
                            className="dashboard-btn"
                        >
                            Dashboards <FiChevronDown />
                        </button>

                        {dashboardOpen && (
                            <div className="dropdown-menu">

                                <Link
                                    to="/candidate-dashboard"
                                    onClick={closeMenu}
                                >
                                    Candidate Portal
                                </Link>

                                <Link
                                    to="/employer-dashboard"
                                    onClick={closeMenu}
                                >
                                    Employer Portal
                                </Link>

                            </div>
                        )}

                    </div>

                    <div className="mobile-tools">

                        <button
                            className="round-btn"
                            onClick={() => setRtl(!rtl)}
                        >
                            RTL
                        </button>

                        <button
                            className="round-btn"
                            onClick={() => setDark(!dark)}
                        >
                            {dark ? <FiSun /> : <FiMoon />}
                        </button>

                        <Link to="/login" className="login-btn">
                            Login
                        </Link>

                    </div>

                </nav>

                <div className="desktop-tools">

                    <button
                        className="round-btn"
                        onClick={() => setRtl(!rtl)}
                    >
                        RTL
                    </button>

                    <button
                        className="round-btn"
                        onClick={() => setDark(!dark)}
                    >
                        {dark ? <FiSun /> : <FiMoon />}
                    </button>

                    <Link to="/login" className="login-btn">
                        Login
                    </Link>

                </div>

            </div>
        </header>
    );
}

export default Navbar;
