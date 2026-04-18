# 🚌 Vortex Transit: Resilient Campus Tracking

**Vortex Transit** is a real-time public transport tracking system built to survive environments with severe network latency and low bandwidth. 

This project was built for **Track B: Resilient Public Transport Tracking System** and demonstrates how strategic edge-computation, data buffering, and visual heuristics can maintain a flawless user experience even during total network drops.

## 🚀 Live Demo & Documentation
* **Documentation:** [Insert your ThinkRoot URL here]
* **Demo Video:** [Insert your Video URL here]

## 🧠 Core Resilience Features

* 📡 **Store-and-Forward Buffering (System Resilience):** The backend actively simulates dead zones. When the network drops, GPS pings are buffered locally. Upon reconnection, the system bulk-syncs all offline data to the server, ensuring zero data loss.
* 🗺️ **Predictive Smoothing (UI/UX):** Implemented hardware-accelerated CSS transitions to visually smooth out the vehicle's path on the Leaflet map between sparse data points, ensuring a clean experience even with staggered pings.
* ⏱️ **Heuristic ETA Prediction:** To calculate accurate ETAs on edge devices without heavy ML overhead, the system uses a dynamic Haversine distance algorithm factored against average transit speeds and randomized traffic variance.

## 🛠️ Tech Stack
* **Backend:** Node.js & Express API for high-throughput telematics data.
* **Database:** MongoDB for persistent state management and offline buffering.
* **Frontend:** Custom HTML/JS Dashboard featuring a dark-themed Leaflet.js interactive map.

## 💻 How to Run Locally

To test the system resilience and buffering logic on your own machine, you will need to run the backend server, the bus simulator, and the frontend dashboard.

**1. Clone the repository and install dependencies:**
```bash
git clone <your-github-repo-url>
cd transit-tracker
npm install

2. Start the Backend Server:
node server.js

3. Start the Telematics Simulator:
node simulate.js