const svg = document.getElementById("chart");
const readout = document.getElementById("readout");

const chartWidth = 800;
const chartHeight = 320;
const padding = 34;

const seriesConfig = [
  {
    key: "power",
    label: "Power",
    unit: "W",
    color: "#4CAF50",
    max: 500
  },
  {
    key: "current",
    label: "Current",
    unit: "A",
    color: "#4A90E2",
    max: 5
  },
  {
    key: "voltage",
    label: "Voltage",
    unit: "V",
    color: "#5C6BC0",
    min: 118,
    max: 124
  },
  {
    key: "powerFactor",
    label: "Power Factor",
    unit: "",
    color: "#FFB300",
    max: 1
  }
];

fetch("sample-data.json")
  .then((response) => response.json())
  .then((data) => {
    drawChart(data);

    svg.addEventListener("pointermove", (event) => {
      const point = getNearestPoint(event, data);
      updateReadout(point);
      drawChart(data, point);
    });

    svg.addEventListener("pointerdown", (event) => {
      const point = getNearestPoint(event, data);
      updateReadout(point);
      drawChart(data, point);
    });

    svg.addEventListener("pointerleave", () => {
      drawChart(data);
    });
  })
  .catch(() => {
    readout.textContent = "Error loading sample-data.json";
  });

function drawChart(data, activePoint = null) {
  svg.innerHTML = "";

  drawGrid();

  seriesConfig.forEach((series) => {
    drawSeries(data, series, activePoint);
  });

  if (activePoint) {
    drawCursor(data, activePoint);
  }
}

function drawSeries(data, series, activePoint) {
  const points = data.map((point, index) => {
    const x = getX(index, data.length);
    const y = getY(point[series.key], series);

    return `${x},${y}`;
  });

  const polyline = document.createElementNS("http://www.w3.org/2000/svg", "polyline");
  polyline.setAttribute("points", points.join(" "));
  polyline.setAttribute("fill", "none");
  polyline.setAttribute("stroke", series.color);
  polyline.setAttribute("stroke-width", series.key === "power" ? "4" : "2");
  polyline.setAttribute("opacity", series.key === "power" ? "1" : "0.75");
  svg.appendChild(polyline);

  data.forEach((point, index) => {
    const x = getX(index, data.length);
    const y = getY(point[series.key], series);

    const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    circle.setAttribute("cx", x);
    circle.setAttribute("cy", y);
    circle.setAttribute("r", activePoint === point ? "6" : "3");
    circle.setAttribute("fill", series.color);
    circle.setAttribute("opacity", series.key === "power" ? "1" : "0.8");
    svg.appendChild(circle);
  });
}

function drawGrid() {
  for (let i = 0; i <= 4; i++) {
    const y = padding + i * ((chartHeight - padding * 2) / 4);

    const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
    line.setAttribute("x1", padding);
    line.setAttribute("x2", chartWidth - padding);
    line.setAttribute("y1", y);
    line.setAttribute("y2", y);
    line.setAttribute("stroke", "#333333");
    line.setAttribute("stroke-width", "1");
    svg.appendChild(line);
  }
}

function drawCursor(data, activePoint) {
  const activeIndex = data.indexOf(activePoint);
  const x = getX(activeIndex, data.length);

  const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
  line.setAttribute("x1", x);
  line.setAttribute("x2", x);
  line.setAttribute("y1", padding);
  line.setAttribute("y2", chartHeight - padding);
  line.setAttribute("stroke", "#ffffff");
  line.setAttribute("stroke-width", "2");
  line.setAttribute("stroke-dasharray", "5 5");
  svg.appendChild(line);
}

function getX(index, totalPoints) {
  return padding + (index / (totalPoints - 1)) * (chartWidth - padding * 2);
}

function getY(value, series) {
  const min = series.min ?? 0;
  const max = series.max;
  const normalized = (value - min) / (max - min);
  const clamped = Math.max(0, Math.min(1, normalized));

  return chartHeight - padding - clamped * (chartHeight - padding * 2);
}

function getNearestPoint(event, data) {
  const rect = svg.getBoundingClientRect();
  const xPercent = (event.clientX - rect.left) / rect.width;
  const index = Math.round(xPercent * (data.length - 1));
  const safeIndex = Math.max(0, Math.min(data.length - 1, index));

  return data[safeIndex];
}

function updateReadout(point) {
  readout.innerHTML = `
    <div class="readout-title">Time: ${point.time}</div>

    <div class="readout-grid">
      <div><strong class="value-power">Power:</strong> ${point.power} W</div>
      <div><strong class="value-current">Current:</strong> ${point.current} A</div>
      <div><strong class="value-voltage">Voltage:</strong> ${point.voltage} V</div>
      <div><strong class="value-pf">Power Factor:</strong> ${point.powerFactor}</div>
    </div>
  `;
}
