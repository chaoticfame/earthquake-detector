# 🌍 Earthquake Detector App Dashboard

A dynamic, client-side web application that fetches, displays, and visualizes real-time earthquake data from the USGS. The application provides an interactive map and a dashboard with counters and charts for easy analysis.


---

## ✨ Features

Based on the provided code, this project includes the following features:

* **Real-Time Data**: Fetches the latest 30-day earthquake summary from the official [USGS API](https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.geojson).
* **Interactive Map**: Utilizes **Leaflet.js** to display earthquake locations on a world map.
* **Clustered Markers**: Employs the **Leaflet.markercluster** plugin to group nearby earthquake markers for a cleaner view at a distance.
* **Dynamic Filtering**: Users can filter the displayed earthquakes by **minimum magnitude** and **geographical region**.
* **Color-Coded Visualization**: Markers are color-coded based on magnitude, providing an at-a-glance understanding of their severity.
* **Live Dashboard**:
    * Counts of total and "strong" (≥4.5 magnitude) earthquakes.
    * A scrollable list of recent earthquake events.
    * A **Chart.js** bar chart showing the distribution of magnitudes.
    * A **Chart.js** line chart tracking the frequency of earthquakes with each data fetch.
* **Major Earthquake Alerts**: Triggers a browser `alert()` and an audible beep for any detected earthquake with a magnitude of 7.0 or greater.
* **Auto-Refresh**: The application automatically fetches new data every 60 seconds to stay up-to-date.

---

## 🛠️ Technologies Used

* **Frontend**: HTML5, CSS3, JavaScript (ES6+ async/await)
* **Mapping**: [Leaflet.js](https://leafletjs.com/) & [Leaflet.markercluster](https://github.com/Leaflet/Leaflet.markercluster)
* **Data Visualization**: [Chart.js](https://www.chartjs.org/)
* **Data Source**: [USGS Earthquake Hazards Program API](https://earthquake.usgs.gov/developers/)

---

## ⚙️ Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

You only need a modern web browser that supports JavaScript (e.g., Chrome, Firefox, Safari, Edge).

### Installation

1.  **Clone the repository:**
    ```sh
    git clone [https://github.com/your-username/earthquake-detector.git](https://github.com/your-username/earthquake-detector.git)
    ```
2.  **Navigate to the project directory:**
    ```sh
    cd earthquake-detector
    ```
3.  **Open the application:**
    Simply open the `index.html` file in your web browser. No web server or build steps are required.

---

## 📖 How to Use

1.  **Open `index.html`** in your browser. The application will immediately fetch and display the latest earthquake data.
2.  **Interact with the Map**: Pan and zoom the map to explore different areas
