// 🔥 Firebase Config (replace)
const firebaseConfig = {
  apiKey: "YOUR_KEY",
  authDomain: "YOUR_DOMAIN",
  databaseURL: "YOUR_DB",
  projectId: "YOUR_ID"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.database();

// 🎯 ALERT SYSTEM
function addAlert(msg) {
  const li = document.createElement("li");
  li.innerText = msg;
  document.getElementById("alertList").appendChild(li);
}

// 🔄 DATA FETCH
db.ref("/").on("value", snap => {
  const d = snap.val();

  temp.innerText = d.temp + " °C";
  air.innerText = d.air;
  soil.innerText = d.soil;
  water.innerText = d.water;
  light.innerText = d.light;

  // 🚨 GAS ALERT
  if (d.gas == 1) {
    gas.innerText = "LEAK!";
    gasCard.style.background = "red";
    addAlert("⚠️ Gas Leak Detected");
  } else {
    gas.innerText = "Safe";
  }

  updateChart(d.temp);
});

// 🎛 CONTROL
function toggleDevice(device) {
  db.ref("/controls/" + device).set(true);
}

// 🌙 THEME TOGGLE
function toggleTheme() {
  document.body.classList.toggle("light-mode");
}

// 📊 GRAPH
let labels = [];
let dataPoints = [];

const ctx = document.getElementById("chart");

const chart = new Chart(ctx, {
  type: "line",
  data: {
    labels: labels,
    datasets: [{
      label: "Temperature",
      data: dataPoints,
      borderWidth: 2
    }]
  }
});

function updateChart(temp) {
  labels.push(new Date().toLocaleTimeString());
  dataPoints.push(temp);

  if (labels.length > 10) {
    labels.shift();
    dataPoints.shift();
  }

  chart.update();
}
