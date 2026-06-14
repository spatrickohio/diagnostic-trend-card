const chartCanvas = document.getElementById("trendChart");
const readout = document.getElementById("readout");

fetch("sample-data.json")
  .then(response => response.json())
  .then(data => {
    const labels = data.map(point => point.time);
    const powerValues = data.map(point => point.power);

    const chart = new Chart(chartCanvas, {
      type: "line",
      data: {
        labels: labels,
        datasets: [
          {
            label: "Power",
            data: powerValues,
            borderColor: "#4CAF50",
            backgroundColor: "rgba(76, 175, 80, 0.15)",
            borderWidth: 2,
            tension: 0.35,
            pointRadius: 4,
            pointHoverRadius: 7,
            fill: true
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        interaction: {
          mode: "nearest",
          intersect: false
        },
        plugins: {
          legend: {
            labels: {
              color: "white"
            }
          },
          tooltip: {
            enabled: true
          }
        },
        scales: {
          x: {
            ticks: { color: "white" },
            grid: { color: "#333" }
          },
          y: {
            ticks: { color: "white" },
            grid: { color: "#333" },
            title: {
              display: true,
              text: "Watts",
              color: "white"
            }
          }
        },
        onHover: (event, activePoints) => {
          if (activePoints.length > 0) {
            const point = activePoints[0];
            const time = labels[point.index];
            const power = powerValues[point.index];

            readout.innerHTML = `
              <strong>Time:</strong> ${time}<br>
              <strong>Power:</strong> ${power} watts
            `;
          }
        }
      }
    });

    chartCanvas.addEventListener("touchmove", event => {
      const touch = event.touches[0];
      const rect = chartCanvas.getBoundingClientRect();
      const x = touch.clientX - rect.left;
      const points = chart.getElementsAtEventForMode(
        event,
        "nearest",
        { intersect: false },
        true
      );

      if (points.length > 0) {
        const point = points[0];
        readout.innerHTML = `
          <strong>Time:</strong> ${labels[point.index]}<br>
          <strong>Power:</strong> ${powerValues[point.index]} watts
        `;
      }
    });
  });
