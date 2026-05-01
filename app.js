const appState = {
  packets: [],
  packetNo: 0,
  intervalId: null,
  isRunning: false,
};

// ---------- HELPERS ----------
function getTime() {
  return new Date().toTimeString().slice(0, 8);
}

function random(list) {
  return list[Math.floor(Math.random() * list.length)];
}

function rand(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// ---------- PACKET ----------
function buildPacket() {
  appState.packetNo++;

  const proto = random(protocolPool);

  let srcPort = rand(1024, 65535);
  let dstPort = random(portPool);
  let service = serviceByPort[dstPort] || "Unknown";

  if (proto === "ICMP") {
    srcPort = "N/A";
    dstPort = "N/A";
    service = "ICMP Echo";
  }

  return {
    id: appState.packetNo,
    time: getTime(),
    srcIP: random(sourcePool),
    dstIP: random(destinationPool),
    proto,
    srcPort,
    dstPort,
    service,
    size: rand(64, 1500),
  };
}

// ---------- UI ----------
function appendRow(p) {
  const tbody = document.getElementById("table-body");

  const noData = document.getElementById("no-data");
  if (noData) noData.remove();

  const row = document.createElement("tr");

  row.dataset.proto = p.proto;
  row.dataset.src = p.srcIP;
  row.dataset.dst = p.dstIP;

  row.innerHTML = `
    <td>${p.id}</td>
    <td>${p.time}</td>
    <td>${p.srcIP}</td>
    <td>${p.dstIP}</td>
    <td>${p.proto}</td>
    <td>${p.srcPort}</td>
    <td>${p.dstPort}</td>
    <td>${p.service}</td>
    <td>${p.size}</td>
  `;

  tbody.appendChild(row);
}

// ---------- LOG ----------
function logActivity(text) {
  const logBox = document.getElementById("log-box");

  const div = document.createElement("div");
  div.textContent = `[${getTime()}] ${text}`;

  logBox.prepend(div);
}

// ---------- STATS ----------
function updateStats() {
  let tcp = 0, udp = 0, icmp = 0, totalSize = 0;

  appState.packets.forEach(p => {
    if (p.proto === "TCP") tcp++;
    if (p.proto === "UDP") udp++;
    if (p.proto === "ICMP") icmp++;
    totalSize += p.size;
  });

  document.getElementById("stat-total").textContent = appState.packets.length;
  document.getElementById("stat-tcp").textContent = tcp;
  document.getElementById("stat-udp").textContent = udp;
  document.getElementById("stat-icmp").textContent = icmp;

  const avg = appState.packets.length
    ? Math.floor(totalSize / appState.packets.length)
    : 0;

  document.getElementById("stat-avg").textContent = avg + " B";
}

// ---------- CONTROL ----------
function startMonitoring() {
  if (appState.isRunning) return;

  appState.isRunning = true;

  document.getElementById("btn-start").disabled = true;
  document.getElementById("btn-stop").disabled = false;

  document.getElementById("status-badge").textContent = "● RUNNING";

  logActivity("Monitoring started");

  appState.intervalId = setInterval(() => {
    const p = buildPacket();
    appState.packets.push(p);

    appendRow(p);
    updateStats();
  }, 800);
}

function stopMonitoring() {
  if (!appState.isRunning) return;

  clearInterval(appState.intervalId);
  appState.isRunning = false;

  document.getElementById("btn-start").disabled = false;
  document.getElementById("btn-stop").disabled = true;

  document.getElementById("status-badge").textContent = "● STOPPED";

  logActivity("Monitoring stopped");
}

function clearAll() {
  appState.packets = [];
  appState.packetNo = 0;

  document.getElementById("table-body").innerHTML = `
    <tr id="no-data">
      <td colspan="9">No packets captured yet. Press Start Monitoring.</td>
    </tr>
  `;

  updateStats();
  logActivity("Data cleared");
}

// ---------- FILTER ----------
function applyFilter() {
  const proto = document.getElementById("filter-proto").value;
  const src = document.getElementById("filter-src").value.toLowerCase();
  const dst = document.getElementById("filter-dst").value.toLowerCase();

  document.querySelectorAll("#table-body tr").forEach(row => {
    if (row.id === "no-data") return;

    const matchProto = !proto || row.dataset.proto === proto;
    const matchSrc = !src || row.dataset.src.toLowerCase().includes(src);
    const matchDst = !dst || row.dataset.dst.toLowerCase().includes(dst);

    row.style.display = (matchProto && matchSrc && matchDst) ? "" : "none";
  });

  logActivity("Filter applied");
}

function resetFilter() {
  document.getElementById("filter-proto").value = "";
  document.getElementById("filter-src").value = "";
  document.getElementById("filter-dst").value = "";

  document.querySelectorAll("#table-body tr").forEach(row => {
    row.style.display = "";
  });

  logActivity("Filter reset");
}