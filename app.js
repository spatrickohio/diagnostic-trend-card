const chartCanvas = document.getElementById("trendChart");
const readout = document.getElementById("readout");

fetch("sample-data.json")
  .then((response) => response.json())
  .then((data) => {
    const labels = data.map((point) => point.time);
    const powerValues = data.map((point) => point.power);

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
              color: "#ffffff"
            }
          },
          tooltip: {
            enabled: true
          }
        },

        scales: {
          x: {
            ticks: {
              color: "#ffffff"
            },
            grid: {
              color: "#333333"
            }
          },
          y: {
            ticks: {
              color: "#ffffff"
            },
            grid: {
              color: "#333333"
            },
            title: {
              display: true,
              text: "Watts",
              color: "#ffffff"
            }
          }
        },

        onHover: (event, activePoints) => {
          if (activePoints.length > 0) {
            const point = activePoints[0];
            updateReadout(labels[point.index], powerValues[point.index]);
          }
        }
      }
    });

    chartCanvas.addEventListener(
      "touchmove",
      (event) => {
        const points = chart.getElementsAtEventForMode(
          event,
          "nearest",
          { intersect: false },
          true
        );

        if (points.length > 0) {
          const point = points[0];
          updateReadout(labels[point.index], powerValues[point.index]);
        }
      },
      { passive: true }
    );
  })
  .catch((error) => {
    readout.innerHTML = "Error loading chart data.";
    console.error(error);
  });

function updateReadout(time, power) {
  readout.innerHTML = `
    <strong>Time:</strong> ${time}<br>
    <strong>Power:</strong> ${power} watts
  `;
}
