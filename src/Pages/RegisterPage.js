import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import API from '../api/axios';
import '../App.css';

const RegisterPage = () => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: ''
  });

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });

    if (error) setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // ✅ VALIDATION
    if (!form.name.trim()) {
      setLoading(false);
      return setError('Full name is required');
    }

    if (!form.email.trim()) {
      setLoading(false);
      return setError('Email is required');
    }

    if (!/\S+@\S+\.\S+/.test(form.email)) {
      setLoading(false);
      return setError('Invalid email format');
    }

    if (!form.password || form.password.length < 6) {
      setLoading(false);
      return setError('Password must be at least 6 characters');
    }

    try {
      const { data } = await API.post('/auth/register', form);

      console.log("REGISTER SUCCESS:", data);

      // ✅ HANDLE BOTH CASES (with or without token)
      if (data?.token) {
        localStorage.setItem('token', data.token);
        navigate('/home');
      } else {
        // fallback kung walang token
        navigate('/login');
      }

    } catch (err) {
      console.error("REGISTER ERROR:", err);

      setError(
        err?.response?.data?.message ||
        err?.message ||
        'Registration failed. Try again.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="content">
      <h2>Create an Account</h2>

      {error && <p className="error-msg">{error}</p>}

      <form className="register-form" onSubmit={handleSubmit}>

        <input
          name="name"
          placeholder="Full Name"
          value={form.name}
          onChange={handleChange}
        />

        <input
          name="email"
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
        />

        <input
          name="password"
          type="password"
          placeholder="Password (min 6 chars)"
          value={form.password}
          onChange={handleChange}
        />

        <button type="submit" disabled={loading}>
          {loading ? "Registering..." : "Register"}
        </button>

      </form>

      <p>
        Already have an account? <Link to="/login">Login</Link>
      </p>

      <footer>
        <p>Contact: tucaykat@gmail.com</p>
        <p>&copy; 2026 My Portfolio. All Rights Reserved.</p>
      </footer>
    </div>
  );
};

export default RegisterPage;