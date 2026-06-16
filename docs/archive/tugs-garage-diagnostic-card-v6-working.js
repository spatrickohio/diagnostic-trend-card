class TugsGarageDiagnosticCard extends HTMLElement {
  setConfig(config) {
    this.config = {
      title: config.title || "Tug's Garage Diagnostic Card",
      sensors: Array.isArray(config.sensors) ? config.sensors : [],
    };

    if (!this.config.sensors.length) {
      throw new Error("You need to define sensors.");
    }
  }

  set hass(hass) {
    this._hass = hass;
    this.render();
  }

  formatSensorValue(value, decimals = 2) {
    const num = Number(value);
    if (!Number.isFinite(num)) return "--";
    return num.toFixed(decimals);
  }

  getSensorColor(sensor) {
    const colors = {
      power: "#4CAF50",
      current: "#4A90E2",
      voltage: "#E040FB",
      power_factor: "#FFEB3B",
      energy: "#FF9800",
      temperature: "#E53935",
      humidity: "#00BCD4",
      water_level: "#2196F3",
      pressure: "#26A69A",
      flow: "#03A9F4",
      runtime: "#9E9E9E",
      cycles: "#FFFFFF",
      alarm: "#F44336",
      fault: "#F44336",
    };

    return sensor.color || colors[sensor.key] || "#FFFFFF";
  }

  render() {
    if (!this.config || !this._hass) return;

    this.innerHTML = `
      <ha-card>
        <style>
          .card {
            padding: 16px;
            background: #111827;
            color: white;
          }

          .title {
            font-size: 20px;
            font-weight: bold;
            margin-bottom: 14px;
          }

          .sensor-row {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 9px 0;
            border-bottom: 1px solid rgba(255,255,255,0.12);
          }

          .sensor-row:last-child {
            border-bottom: none;
          }

          .sensor-name {
            color: #d1d5db;
            font-size: 15px;
          }

          .sensor-value {
            min-width: 95px;
            text-align: right;
            font-size: 17px;
            font-weight: bold;
          }
        </style>

        <div class="card">
          <div class="title">${this.config.title}</div>

          ${this.config.sensors
            .map((sensor) => {
              const stateObj = this._hass.states[sensor.entity];
              const rawValue = stateObj?.state;
              const decimals = sensor.decimals ?? 2;
              const unit =
                sensor.unit ?? stateObj?.attributes?.unit_of_measurement ?? "";
              const value = this.formatSensorValue(rawValue, decimals);
              const color = this.getSensorColor(sensor);

              return `
                <div class="sensor-row">
                  <div class="sensor-name">${sensor.name}</div>
                  <div class="sensor-value" style="color:${color};">
                    ${value} ${unit}
                  </div>
                </div>
              `;
            })
            .join("")}
        </div>
      </ha-card>
    `;
  }

  getCardSize() {
    return 3;
  }
}

customElements.define(
  "tugs-garage-diagnostic-card",
  TugsGarageDiagnosticCard
);
