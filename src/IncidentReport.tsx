import React from "react";

const IncidentReport: React.FC = () => (
  <div className="min-h-screen flex items-center justify-center bg-gray-900 py-12 px-4">
    <div className="bg-gray-800 border-2 border-red-600 rounded-lg shadow-xl max-w-2xl w-full p-8">
      <h1 className="text-3xl font-bold text-red-400 mb-2 flex items-center gap-2">
        <span role="img" aria-label="emergency">🚨</span> EMERGENCY SECURITY INCIDENT REPORT
      </h1>
      <div className="mb-4 text-gray-200">
        <div className="flex flex-wrap gap-4 mb-2">
          <span className="font-semibold">Incident ID:</span> #INC-HNYPT-38291
          <span className="font-semibold">Date:</span> July 25, 2025
        </div>
        <div className="flex flex-wrap gap-4 mb-2">
          <span className="font-semibold">Source IP:</span> 198.51.100.14 (Romania)
          <span className="font-semibold">Vector:</span> SQL Injection → Buffer Overflow → Privilege Escalation
        </div>
        <div className="flex flex-wrap gap-4 mb-2">
          <span className="font-semibold">Threat Confidence:</span> 86%
        </div>
      </div>
      <div className="border-l-4 border-red-500 pl-4 mb-4">
        <h2 className="font-bold text-lg mb-1 text-red-300">🧱 Summary:</h2>
        <p>A honeypot was breached by a sophisticated attacker.<br/>Real cloud and data are unaffected.</p>
      </div>
      <div className="border-l-4 border-blue-500 pl-4 mb-4">
        <h2 className="font-bold text-lg mb-1 text-blue-300">🧠 AI Actions Taken:</h2>
        <ul className="list-disc list-inside">
          <li>Detected attack path</li>
          <li>Trained new defense model</li>
          <li>Generated updated rules</li>
          <li>Prepared global deployment</li>
        </ul>
      </div>
      <div className="border-l-4 border-yellow-500 pl-4 mb-4">
        <h2 className="font-bold text-lg mb-1 text-yellow-300">📤 Reported To:</h2>
        <ul className="list-disc list-inside">
          <li>AWS Security</li>
          <li>Kaspersky Threat Labs</li>
          <li>MITRE ATT&CK</li>
        </ul>
      </div>
      <div className="border-l-4 border-green-500 pl-4 mb-4">
        <h2 className="font-bold text-lg mb-1 text-green-300">✅ Conclusion:</h2>
        <p>No live systems compromised.<br/>AI is learning and adapting.<br/>New model to be deployed in real cloud next.</p>
      </div>
      <div className="text-right text-xs text-gray-400 mt-6">
        — Issued by AI Deception Network Control
      </div>
    </div>
  </div>
);

export default IncidentReport; 