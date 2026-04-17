import { useState } from "react";
import API from "../api/axios";
import "../App.css";

function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [messageError, setMessageError] = useState("");
  const [success, setSuccess] = useState("");

  const resetMessages = () => {
    setNameError("");
    setEmailError("");
    setMessageError("");
    setSuccess("");
  };

  const validateForm = async (e) => {
    e.preventDefault();
    let valid = true;

    resetMessages();

    if (name.trim() === "") {
      setNameError("Please enter your name");
      valid = false;
    }

    if (email.trim() === "") {
      setEmailError("Please enter your email");
      valid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setEmailError("Invalid email format");
      valid = false;
    }

    if (message.trim() === "") {
      setMessageError("Please write a message");
      valid = false;
    }

    if (!valid) return;

    try {
      // ✅ SEND TO BACKEND (THIS IS THE FIX)
      await API.post("/messages", {
        name,
        email,
        message,
      });

      setSuccess("🌸 Message Sent Successfully!");

      setName("");
      setEmail("");
      setMessage("");
    } catch (err) {
      setSuccess("❌ Failed to send message");
      console.log(err);
    }
  };

  return (
    <div>

      <main>

        <section>
          <h2>Get in Touch</h2>

          <form onSubmit={validateForm}>
            <label>Name:</label>
            <input
              type="text"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                setNameError("");
              }}
            />
            <span className="error">{nameError}</span>

            <label>Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setEmailError("");
              }}
            />
            <span className="error">{emailError}</span>

            <label>Message:</label>
            <textarea
              rows="5"
              value={message}
              onChange={(e) => {
                setMessage(e.target.value);
                setMessageError("");
              }}
            />
            <span className="error">{messageError}</span>

            <button type="submit">Send Message</button>

            <div className="success-message">{success}</div>
          </form>
        </section>

      </main>

    </div>
  );
}

export default Contact;