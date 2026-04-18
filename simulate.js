// simulate.js
const API_URL = 'http://localhost:3000/api/location';

let offlineBuffer = []; // The cache where we store data during a network drop
let isOnline = true; 

// Starting coordinates (Nagercoil)
let currentLat = 8.1833;
let currentLng = 77.4119;

const pingLocation = async () => {
    // 1. Move the bus slightly every few seconds to simulate driving
    currentLat -= 0.0001; 
    currentLng += 0.0001;

    const payload = {
        busId: "TN-74-A-1024",
        latitude: currentLat,
        longitude: currentLng,
        timestamp: new Date(),
        isOfflineBuffered: false 
    };

    // 2. SIMULATE NETWORK DROPS (30% chance to lose connection)
    if (Math.random() < 0.3) {
        isOnline = false;
    } else {
        isOnline = true;
    }

    // 3. Handle Offline State (The Hackathon Requirement!)
    if (!isOnline) {
        console.log(`🔴 NETWORK DROP! Dead zone entered. Buffering location [${currentLat.toFixed(4)}, ${currentLng.toFixed(4)}] locally...`);
        payload.isOfflineBuffered = true;
        offlineBuffer.push(payload);
        return; // Stop here, don't try to send to server
    }

    // 4. Handle Online State & Sync Buffer
    try {
        // If we just got connection back, push all stored data!
        if (offlineBuffer.length > 0) {
            console.log(`🟢 Connection restored! Syncing ${offlineBuffer.length} buffered offline locations to server...`);
            
            for (let data of offlineBuffer) {
                 await fetch(API_URL, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(data)
                });
            }
            offlineBuffer = []; // Clear the buffer after syncing
            console.log("✅ Buffer successfully cleared and synced.");
        }

        // Send the current live ping
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });

        const data = await response.json();
        if (data.success) {
            console.log(`🚌 Live Tracking: Bus at [${currentLat.toFixed(4)}, ${currentLng.toFixed(4)}]`);
        }
    } catch (error) {
        console.error("❌ Server unreachable. Buffering data...");
        payload.isOfflineBuffered = true;
        offlineBuffer.push(payload);
    }
};

// Start the engine! Ping every 3 seconds automatically.
console.log("🚌 Advanced Bus Simulator started... Driving route.");
setInterval(pingLocation, 3000);