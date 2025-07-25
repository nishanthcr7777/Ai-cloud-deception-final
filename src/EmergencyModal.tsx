import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const EmergencyModal: React.FC = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === "Space" && !open) {
        setOpen(true);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [open]);

  const handleRedirect = () => {
    setOpen(false);
    navigate("/incident-report");
  };

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70 cursor-pointer"
      onClick={handleRedirect}
    >
      <div
        className="bg-red-700 text-white rounded-lg shadow-lg p-8 max-w-md w-full text-center border-4 border-red-900 animate-pulse"
        onClick={handleRedirect}
      >
        <h2 className="text-2xl font-bold mb-4 flex items-center justify-center gap-2">
          <span role="img" aria-label="alert">⚠️</span> Emergency Alert: Honeypot Breach Detected
        </h2>
        <p className="mb-6">A decoy server was compromised. Click to view full report.</p>
        <button
          className="bg-white text-red-700 font-semibold px-6 py-2 rounded shadow hover:bg-red-100 transition"
          onClick={handleRedirect}
        >
          View Incident Report
        </button>
      </div>
    </div>
  );
};

export default EmergencyModal; 