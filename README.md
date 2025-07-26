# AI-Driven Cloud Deception Network Website


An advanced AI-driven deception platform that simulates vulnerable cloud services to lure, detect, and study malicious cyber actors — without compromising real assets. Built with React (Vite), Convex backend, and integrates anomaly detection, honeypot logging, and real-time alerting.

---

## 🚀 Features

- 🔐 **User Login System**
  - Secure user authentication and persistent session storage
- 🕵️ **Deployable Honeypots**
  - Launch multiple fake cloud endpoints to simulate real targets
- 📈 **Real-Time Threat Logging**
  - Logs IP address, endpoint, geolocation, and anomaly scores
- 🧠 **AI-Powered Anomaly Detection**
  - Identifies suspicious behavior with smart scoring
- 🧩 **Interactive Dashboard**
  - Clean UI to monitor attacks, threats, and honeypot health
- 🚨 **Emergency Response Document**
  - Simulated post-breach report with threat summary and AI response

---

## 🧠 Tech Stack

| Frontend | Backend | Storage |
|----------|---------|---------|
| React + Vite | Convex | Convex DB |
| TailwindCSS | Convex Functions | Convex Auth |

---

## 🛠️ Running Locally

### 1. Clone the Repo

git clone https://github.com/nishanthcr7777/Ai-cloud-deception-final.git
cd Ai-cloud-deception-final

This is a project built  using [Convex](https://convex.dev) as its backend.
  
This project is connected to the Convex deployment named [`wandering-stingray-306`](https://dashboard.convex.dev/d/wandering-stingray-306).

2. Install Dependencies

npm install

3. Add Environment Variables

Create a .env file with:

VITE_CONVEX_URL=https://wandering-stingray-306.convex.cloud
  
## Project structure
  
The frontend code is in the `app` directory and is built with [Vite](https://vitejs.dev/).
  
The backend code is in the `convex` directory.
  
`npm run dev` will start the frontend and backend servers.


🌐 Live Demo
👉 https://ai-cloud-deception-final.vercel.app

📄 Emergency Breach Simulation
This project includes a simulated cloud breach response:

Honeypot breach triggers emergency mode

Document logs threat origin, behavior, and AI analysis

Message generated for Kaspersky/AWS SOC

AI defense models begin learning from attacker behavior

## HTTP API

User-defined http routes are defined in the `convex/router.ts` file. We split these routes into a separate file from `convex/http.ts` to allow us to prevent the LLM from modifying the authentication routes.
