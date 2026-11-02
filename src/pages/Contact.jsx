
import { useState } from "react";

function Contact() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    e.target.reset();
  };

  return (
    <>
      <section className="page-hero">
        <h1>Contact Us</h1>
        <p>We would love to hear from you.</p>
      </section>

      <section className="container section contact-content">

        <div>
          <h2>Let's start a conversation.</h2>
          <p>Email: hello@recruitpro.example</p>
          <p>Phone: +91 98765 43210</p>
        </div>

        <form className="form-card" onSubmit={handleSubmit}>

          <label>
            Your Name
            <input required placeholder="Enter your name" />
          </label>

          <label>
            Email Address
            <input
              type="email"
              required
              placeholder="Enter your email"
            />
          </label>

          <label>
            Message
            <textarea required rows="5" />
          </label>

          <button className="primary-btn">
            Send Message
          </button>

          {submitted && (
            <p className="success">
              Thank you! Your demo message was submitted.
            </p>
          )}

        </form>

      </section>
    </>
  );
}

export default Contact;
