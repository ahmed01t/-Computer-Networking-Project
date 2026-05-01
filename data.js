// DATA FILE

const protocolPool = ["TCP", "UDP", "ICMP"];

const portPool = [80, 443, 21, 22, 53];

const serviceByPort = {
  80: "HTTP",
  443: "HTTPS",
  21: "FTP",
  22: "SSH",
  53: "DNS",
};

const sourcePool = [
  "192.168.1.2",
  "10.0.0.5",
  "172.16.0.3",
];

const destinationPool = [
  "8.8.8.8",
  "1.1.1.1",
  "192.168.0.1",
];