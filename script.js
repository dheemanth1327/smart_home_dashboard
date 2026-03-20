// 🔥 YOUR FIREBASE CONFIG (PUT CORRECT VALUES)
const firebaseConfig = {
  apiKey: "AIzaSyDvYT4z0C37ZXiuYkKJJeWH-T4lVayopQQ",
  authDomain: "smart-home-dashboard-dc771.firebaseapp.com",
  databaseURL: "https://smart-home-dashboard-dc771-default-rtdb.firebaseio.com",
  projectId: "smart-home-dashboard-dc771",
  storageBucket: "smart-home-dashboard-dc771.firebasestorage.app",
  messagingSenderId: "701911123128",
  appId: "1:701911123128:web:2986d8c65f27e9797f204d"
};


// INIT
firebase.initializeApp(firebaseConfig);
const db = firebase.database();

// 📊 CHART SETUP
let selectedSensor = null;

let labels = [];
let dataPoints = [];

const ctx = document.getElementById("chart");

const chart = new Chart(ctx, {
  type: "line",
  data: {
    labels: labels,
    datasets: [{
      label: "Sensor Data",
      data: dataPoints,
      borderWidth: 2
    }]
  }
});

// 🎯 SELECT SENSOR
function selectSensor(sensor) {
  selectedSensor = sensor;

  document.getElementById("graphContainer").style.display = "block";
  document.getElementById("graphTitle").innerText = sensor.toUpperCase() + " GRAPH";

  // Reset graph
  labels = [];
  dataPoints = [];
  chart.data.labels = labels;
  chart.data.datasets[0].data = dataPoints;
  chart.update();
}