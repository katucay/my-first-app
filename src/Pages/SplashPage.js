import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function SplashPage() {
  const [dots, setDots] = useState("");
  const [fade, setFade] = useState(false);
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    let dotCount = 0;

    const dotInterval = setInterval(() => {
      dotCount = (dotCount + 1) % 4;
      setDots(".".repeat(dotCount));
    }, 500);

    const timer = setTimeout(() => {
      clearInterval(dotInterval);
      setFade(true);

      setTimeout(() => {
        navigate("/home");
      }, 500);
    }, 3000); // slightly longer for better UX

    return () => {
      clearInterval(dotInterval);
      clearTimeout(timer);
    };
  }, [navigate]);

  return (
    <>
      <style>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        body, html {
          height: 100%;
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        }

        .page {
          background: linear-gradient(#FDB777, #FD7F2C 0%, #FDA766 20%);
          height: 100vh;
          display: flex;
          justify-content: center;
          align-items: center;
          overflow: hidden;
        }

        .loader-container {
          text-align: center;
          color: white;
        }

        .logo {
          font-size: 100px;
          margin-bottom: 20px;
          animation: float 3s ease-in-out infinite;
        }

        @keyframes float {
          0%,100% { transform: translateY(0); }
          50% { transform: translateY(-20px); }
        }

        h1 {
          font-size: 48px;
          margin-bottom: 20px;
          text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
        }

        .spinner {
          width: 70px;
          height: 70px;
          border: 6px solid rgba(255,255,255,0.3);
          border-top: 6px solid white;
          border-radius: 50%;
          margin: 25px auto;
          animation: spin 1s linear infinite;
        }

        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        .loading-text {
          font-size: 18px;
          margin-top: 10px;
        }

        .dots {
          display: inline-block;
          width: 30px;
        }

        .fade-out {
          animation: fadeOut 0.5s ease-out forwards;
        }

        @keyframes fadeOut {
          to { opacity: 0; }
        }

        .splash-actions {
          margin-top: 25px;
        }

        .btn {
          display: inline-block;
          margin: 5px;
          padding: 10px 18px;
          border-radius: 8px;
          text-decoration: none;
          font-weight: 500;
        }

        .btn-primary {
          background: white;
          color: #FD7F2C;
        }

        .btn-secondary {
          border: 2px solid white;
          color: white;
        }
      `}</style>

      <div className="page">
        <div className={`loader-container ${fade ? "fade-out" : ""}`}>
          <div className="logo">🌸🌸🌸🌸🌸</div>
          <h1>BLOOM THROUGH LENS</h1>

          <div className="spinner"></div>

          <div className="loading-text">
            Loading<span className="dots">{dots}</span>
          </div>

          {/* OPTIONAL: show buttons if user is already loaded */}
          {user && (
            <div className="splash-actions">
              <Link to="/home" className="btn btn-primary">
                Enter App
              </Link>
              <Link to="/create-post" className="btn btn-secondary">
                Write Post
              </Link>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default SplashPage;