function navigateTo(pageId) {
    // Hide all pages
    document.getElementById('dashboard-page').classList.add('hidden');
    document.getElementById('login-page').classList.add('hidden');
    document.getElementById('map-page').classList.add('hidden');

    // Show selected page
    document.getElementById(pageId).classList.remove('hidden');

    // Load Map if navigating to Map Page
    if (pageId === 'map-page') {
        setTimeout(initMap, 300);
    }
}

function handleAuth(event) {
    event.preventDefault(); // Stop form refresh
    navigateTo('map-page');
}

let map;
function initMap() {
    if (map) {
        map.invalidateSize(); // Ensure map fits container
        return;
    }

    // Centered on New Delhi as per screenshot
    map = L.map('map').setView([28.6139, 77.2090], 13);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap'
    }).addTo(map);

    L.marker([28.6139, 77.2090]).addTo(map)
        .bindPopup('<b>Live Location</b><br>SafeZone Status: Active')
        .openPopup();
}

function getUserLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((pos) => {
            const { latitude, longitude } = pos.coords;
            map.setView([latitude, longitude], 15);
            L.marker([latitude, longitude]).addTo(map).bindPopup("Your Location").openPopup();
        });
    }
}