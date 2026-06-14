const svg = document.getElementById("chart");
const readout = document.getElementById("readout");

const chartWidth = 800;
const chartHeight = 320;
const padding = 32;

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
  })
  .catch(() => {
    readout.textContent = "Error loading sample-data.json";
  });

function drawChart(data, activePoint = null) {
  svg.innerHTML = "";

  const maxPower = Math.max(...data.map((p) => p.power), 500);

  drawGrid();

  const points = data.map((point, index) => {
    const x =
      padding +
      (index / (data.length - 1)) * (chartWidth - padding * 2);

    const y =
      chartHeight -
      padding -
      (point.power / maxPower) * (chartHeight - padding * 2);

    return `${x},${y}`;
  });

  const polyline = document.createElementNS("http://www.w3.org/2000/svg", "polyline");
  polyline.setAttribute("points", points.join(" "));
  polyline.setAttribute("fill", "none");
  polyline.setAttribute("stroke", "#4CAF50");
  polyline.setAttribute("stroke-width", "3");
  svg.appendChild(polyline);

  data.forEach((point, index) => {
    const x =
      padding +
      (index / (data.length - 1)) * (chartWidth - padding * 2);

    const y =
      chartHeight -
      padding -
      (point.power / maxPower) * (chartHeight - padding * 2);

    const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    circle.setAttribute("cx", x);
    circle.setAttribute("cy", y);
    circle.setAttribute("r", activePoint === point ? "7" : "4");
    circle.setAttribute("fill", "#4CAF50");
    svg.appendChild(circle);
  });

  if (activePoint) {
    const activeIndex = data.indexOf(activePoint);
    const x =
      padding +
      (activeIndex / (data.length - 1)) * (chartWidth - padding * 2);

    const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
    line.setAttribute("x1", x);
    line.setAttribute("x2", x);
    line.setAttribute("y1", padding);
    line.setAttribute("y2", chartHeight - padding);
    line.setAttribute("stroke", "#ffffff");
    line.setAttribute("stroke-width", "1");
    line.setAttribute("stroke-dasharray", "4 4");
    svg.appendChild(line);
  }
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

function getNearestPoint(event, data) {
  const rect = svg.getBoundingClientRect();
  const xPercent = (event.clientX - rect.left) / rect.width;
  const index = Math.round(xPercent * (data.length - 1));
  const safeIndex = Math.max(0, Math.min(data.length - 1, index));

  return data[safeIndex];
}

function updateReadout(point) {
  readout.innerHTML = `
    <strong>Time:</strong> ${point.time}<br>
    <strong>Power:</strong> ${point.power} watts
  `;
}
