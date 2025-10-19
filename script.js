// Initialize map and cluster group
const map = L.map('map').setView([20, 0], 2);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

const markersCluster = L.markerClusterGroup().addTo(map);

const alertSound = document.getElementById('alertSound');
const quakeList = document.getElementById('quakeList');
const totalCountElem = document.getElementById('totalCount');
const strongCountElem = document.getElementById('strongCount');
const minMagSelect = document.getElementById('minMag');
const regionSelect = document.getElementById('region');

let magnitudeChart, frequencyChart;

// Color based on magnitude
function getColor(mag) {
  if (mag >= 7) return '#4B0000';
  if (mag >= 6) return '#8B0000';
  if (mag >= 5) return '#FF4500';
  if (mag >= 4.5) return '#FFA500';
  return '#FFD700';
}

// Region detection by place string
function inRegion(place, region) {
  if (region === 'all') return true;
  return place.includes(region);
}

// Initialize charts
function initCharts() {
  const magCtx = document.getElementById('magnitudeChart').getContext('2d');
  magnitudeChart = new Chart(magCtx, {
    type: 'bar',
    data: {
      labels: ['<4.5', '4.5-5', '5-6', '6-7', '7+'],
      datasets: [{
        label: 'Number of Earthquakes',
        data: [0, 0, 0, 0, 0],
        backgroundColor: ['#FFD700', '#FFA500', '#FF4500', '#8B0000', '#4B0000']
      }]
    },
    options: { responsive: true, plugins: { legend: { display: false } } }
  });

  const freqCtx = document.getElementById('frequencyChart').getContext('2d');
  frequencyChart = new Chart(freqCtx, {
    type: 'line',
    data: { labels: [], datasets: [{ label: 'Earthquakes per Fetch', data: [], borderColor:'#d9534f', fill:false }] },
    options: { responsive: true }
  });
}

// Fetch and update earthquakes
async function fetchEarthquakes() {
  try {
    const response = await fetch('https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.geojson');
    const data = await response.json();
    const earthquakes = data.features;

    quakeList.innerHTML = '';
    markersCluster.clearLayers();

    let total = 0, strong = 0;
    let magCounts = [0,0,0,0,0]; // <4.5,4.5-5,5-6,6-7,7+
    const minMag = parseFloat(minMagSelect.value);
    const region = regionSelect.value;

    earthquakes.forEach(eq => {
      const { mag, place, time } = eq.properties;
      const [lon, lat] = eq.geometry.coordinates;

      if (mag < minMag || !inRegion(place, region)) return;

      total++;
      if (mag >= 4.5) strong++;

      // magnitude bins
      if (mag < 4.5) magCounts[0]++;
      else if (mag < 5) magCounts[1]++;
      else if (mag < 6) magCounts[2]++;
      else if (mag < 7) magCounts[3]++;
      else magCounts[4]++;

      // Add marker
      const marker = L.circleMarker([lat, lon], {
        radius: mag * 3,
        color: getColor(mag),
        fillColor: getColor(mag),
        fillOpacity: 0.6,
        weight: 1
      }).bindPopup(`<strong>Location:</strong> ${place}<br><strong>Magnitude:</strong> ${mag}<br><strong>Time:</strong> ${new Date(time).toLocaleString()}`);
      markersCluster.addLayer(marker);

      // High magnitude alert
      if (mag >= 7) {
        alertSound.play();
        alert(`⚠️ Major Earthquake Detected!\nMagnitude ${mag} at ${place}`);
      }

      const div = document.createElement('div');
      div.className = 'quake';
      div.innerHTML = `<strong>Mag:</strong>${mag} <strong>Place:</strong>${place}<br><small>${new Date(time).toLocaleString()}</small>`;
      quakeList.appendChild(div);
    });

    totalCountElem.textContent = total;
    strongCountElem.textContent = strong;

    // Update charts
    magnitudeChart.data.datasets[0].data = magCounts;
    magnitudeChart.update();

    const now = new Date();
    frequencyChart.data.labels.push(now.toLocaleTimeString());
    frequencyChart.data.datasets[0].data.push(total);
    if (frequencyChart.data.labels.length > 20) {
      frequencyChart.data.labels.shift();
      frequencyChart.data.datasets[0].data.shift();
    }
    frequencyChart.update();

  } catch (error) {
    console.error('Error fetching earthquake data:', error);
  }
}

// Event listeners
minMagSelect.addEventListener('change', fetchEarthquakes);
regionSelect.addEventListener('change', fetchEarthquakes);

// Initialize app
initCharts();
fetchEarthquakes();
setInterval(fetchEarthquakes, 60000);