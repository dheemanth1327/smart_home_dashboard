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
let labels = [];
let dataPoints = [];

const ctx = document.getElementById("chart");

const chart = new Chart(ctx, {
  type: "line",
  data: {
    labels: labels,
    datasets: [{
      label: "Temperature",
      data: dataPoints
    }]
  }
});

// 🔄 FETCH DATA
db.ref("/").on("value", (snap) => {
  const d = snap.val();

  if (!d) return;

  document.getElementById("temp").innerText = d.temp + " °C";
  document.getElementById("air").innerText = d.air;
  document.getElementById("soil").innerText = d.soil;
  document.getElementById("water").innerText = d.water;

  // 🚨 GAS
  if (d.gas == 1) {
    document.getElementById("gas").innerText = "LEAK!";
    document.getElementById("gasCard").style.background = "red";
  } else {
    document.getElementById("gas").innerText = "Safe";
  }

  // 📊 GRAPH UPDATE
  labels.push(new Date().toLocaleTimeString());
  dataPoints.push(d.temp);

  if (labels.length > 10) {
    labels.shift();
    dataPoints.shift();
  }

  chart.update();
});