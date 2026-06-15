const svg = document.getElementById("chart");
const readout = document.getElementById("readout");
const timeButtons = document.querySelectorAll(".time-controls button");

const chartWidth = 800;
const chartHeight = 320;
const padding = 34;

let allData = [];
let currentHours = 24;

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
    color: "#E040FB",
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
    allData = data;
    renderSelectedWindow();

    svg.addEventListener("pointermove", handlePointer);
    svg.addEventListener("pointerdown", handlePointer);

    timeButtons.forEach((button) => {
      button.addEventListener("click", () => {
        currentHours = Number(button.dataset.hours);

        timeButtons.forEach((btn) => btn.classList.remove("active"));
        button.classList.add("active");

        renderSelectedWindow();
      });
    });
  })
  .catch(() => {
    readout.textContent = "Error loading sample-data.json";
  });

function renderSelectedWindow() {
  const visibleData = getVisibleData();

  drawChart(visibleData);

  readout.innerHTML = `
    <div class="readout-title">Viewing Last ${currentHours} Hours</div>
    <div>Touch or drag across the chart to inspect history.</div>
  `;
}

function getVisibleData() {
  const maxHour = Math.max(...allData.map((point) => point.hour));
  const startHour = maxHour - currentHours;

  return allData.filter((point) => point.hour >= startHour);
}

function handlePointer(event) {
  const visibleData = getVisibleData();
  const point = getNearestPoint(event, visibleData);

  updateReadout(point);
  drawChart(visibleData, point);
}

function drawChart(data, activePoint = null) {
  svg.innerHTML = "";

  if (data.length < 2) {
    readout.textContent = "Not enough data for this time window.";
    return;
  }

  drawGrid();
  drawTimeLabels(data);

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
  polyline.setAttribute("stroke-width", "3");
  polyline.setAttribute("opacity", "1");
  svg.appendChild(polyline);

  data.forEach((point, index) => {
    const x = getX(index, data.length);
    const y = getY(point[series.key], series);

    const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    circle.setAttribute("cx", x);
    circle.setAttribute("cy", y);
    circle.setAttribute("r", activePoint === point ? "5" : "2");
    circle.setAttribute("fill", series.color);
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

function drawTimeLabels(data) {
  const firstPoint = data[0];
  const lastPoint = data[data.length - 1];

  drawText(firstPoint.time, padding, chartHeight - 8, "start");
  drawText(lastPoint.time, chartWidth - padding, chartHeight - 8, "end");
}

function drawText(text, x, y, anchor) {
  const label = document.createElementNS("http://www.w3.org/2000/svg", "text");
  label.textContent = text;
  label.setAttribute("x", x);
  label.setAttribute("y", y);
  label.setAttribute("fill", "#aaaaaa");
  label.setAttribute("font-size", "13");
  label.setAttribute("text-anchor", anchor);
  svg.appendChild(label);
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
