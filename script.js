// 🔥 Firebase config (replace with yours)
const firebaseConfig = {
  apiKey: "YOUR_KEY",
  authDomain: "YOUR_DOMAIN",
  databaseURL: "YOUR_DB_URL",
  projectId: "YOUR_ID"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.database();

// 🔄 Read data
db.ref("/").on("value", (snapshot) => {
  const data = snapshot.val();

  document.getElementById("temp").innerText = data.temp + " °C";
  document.getElementById("air").innerText = data.air;
  document.getElementById("soil").innerText = data.soil;
  document.getElementById("water").innerText = data.water;
  document.getElementById("light").innerText = data.light;

  // 🚨 Gas Alert
  if (data.gas == 1) {
    document.getElementById("gas").innerText = "LEAK!";
    document.getElementById("gasCard").style.background = "red";
    alert("⚠️ Gas Leak Detected!");
  } else {
    document.getElementById("gas").innerText = "Safe";
  }

});

// 📊 Chart
const ctx = document.getElementById('chart');

new Chart(ctx, {
  type: 'line',
  data: {
    labels: [],
    datasets: [{
      label: 'Temperature',
      data: [],
      borderWidth: 2
    }]
  }
});