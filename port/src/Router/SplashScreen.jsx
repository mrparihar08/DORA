import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export default function SplashScreen() {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/dashboard");
    }, 2000);
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="splash-container">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1 }}
      >
        <div className="splash-logo">
          <span>H+</span>
        </div>
        <h1 className="splash-title">Your Personal Healthcare Assistant</h1>
        <p className="splash-tagline">Stay Healthy, Stay Informed</p>
      </motion.div>
    </div>
  );
}
