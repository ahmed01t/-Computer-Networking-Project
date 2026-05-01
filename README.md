# 🌐 Network Traffic Monitor

A lightweight network traffic simulation dashboard built with **HTML, CSS, and JavaScript**. It generates real-time packet data and provides filtering, logging, and statistical insights through an interactive UI.


## 🚀 Features

* Real-time packet generation and display
* Live statistics (Total, TCP, UDP, ICMP, Avg Size)
* Filtering by Protocol, Source IP, and Destination IP
* Activity logging (start, stop, filter, clear)
* Modular structure (separate data and logic files)


## 🏗️ Structure

```id="z8d2d1"
index.html   → UI  
style.css    → Styling  
data.js      → Dataset  
app.js       → Core logic  
```

## 🧠 Core Functions

* **buildPacket()** → Generates simulated packet data
* **appendRow()** → Displays packet in table
* **logActivity()** → Logs system/user actions
* **updateStats()** → Updates packet statistics
* **startMonitoring()** → Starts real-time simulation
* **stopMonitoring()** → Stops simulation
* **clearAll()** → Clears all data
* **applyFilter()** → Filters packets
* **resetFilter()** → Resets filters

---

## ▶️ Usage

1. Open `index.html` in a browser
2. Click **Start Monitoring**
3. View packets, apply filters, and analyze statistics

---

## 🛠️ Tech Stack
HTML5 • CSS • JavaScript

---

## 👨‍💻 Author
Ahmed Tanveer
