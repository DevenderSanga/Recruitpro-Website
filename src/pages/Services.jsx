
import { FiSearch, FiUsers, FiFileText, FiTrendingUp } from "react-icons/fi";

function Services() {
  const services = [
    {
      icon: <FiSearch />,
      title: "Job Discovery",
      description: "Find relevant job openings using search and filters."
    },
    {
      icon: <FiUsers />,
      title: "Talent Connections",
      description: "Connect candidates with potential employers."
    },
    {
      icon: <FiFileText />,
      title: "Career Profile",
      description: "Showcase your skills, experience and qualifications."
    },
    {
      icon: <FiTrendingUp />,
      title: "Career Growth",
      description: "Track applications and explore career opportunities."
    }
  ];

  return (
    <>
      <section className="page-hero">
        <h1>Our Services</h1>
        <p>Everything you need for your hiring journey.</p>
      </section>

      <section className="container section feature-grid">

        {services.map((service) => (
          <div className="feature-card" key={service.title}>

            <div className="feature-icon">
              {service.icon}
            </div>

            <h3>{service.title}</h3>
            <p>{service.description}</p>

          </div>
        ))}

      </section>
    </>
  );
}

export default Services;
