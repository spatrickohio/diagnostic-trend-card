class TugsGarageDiagnosticCard extends HTMLElement {
  setConfig(config) {
    this.config = {
      title: config.title || "Tug's Garage Diagnostic Card",
      status: config.status || "normal",
      device_status: config.device_status || "online",
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
      target: "#FFFFFF",
      baseline: "#9E9E9E",
    };

    return sensor.color || colors[sensor.key] || "#FFFFFF";
  }

  getStatusBadge(status) {
    const cleanStatus = String(status || "normal").toLowerCase();

    const badges = {
      normal: {
        label: "NORMAL",
        color: "#4CAF50",
        background: "rgba(76, 175, 80, 0.18)",
      },
      warning: {
        label: "WARNING",
        color: "#FFB300",
        background: "rgba(255, 179, 0, 0.18)",
      },
      fault: {
        label: "FAULT",
        color: "#F44336",
        background: "rgba(244, 67, 54, 0.18)",
      },
    };

    return badges[cleanStatus] || badges.normal;
  }

  getDeviceBadge(deviceStatus) {
    const cleanStatus = String(deviceStatus || "online").toLowerCase();

    const badges = {
      online: {
        label: "ONLINE",
        color: "#4CAF50",
        background: "rgba(76, 175, 80, 0.18)",
      },
      offline: {
        label: "OFFLINE",
        color: "#F44336",
        background: "rgba(244, 67, 54, 0.18)",
      },
      unknown: {
        label: "UNKNOWN",
        color: "#9E9E9E",
        background: "rgba(158, 158, 158, 0.18)",
      },
    };

    return badges[cleanStatus] || badges.online;
  }

  render() {
    if (!this.config || !this._hass) return;

    const statusBadge = this.getStatusBadge(this.config.status);
    const deviceBadge = this.getDeviceBadge(this.config.device_status);

    this.innerHTML = `
      <ha-card>
        <style>
          .card {
            padding: 16px;
            background: #111827;
            color: white;
            border-radius: 12px;
          }

          .inner-card {
            padding: 22px 28px;
            border: 1px solid rgba(255,255,255,0.18);
            border-radius: 14px;
          }

          .header {
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            gap: 10px;
            margin-bottom: 22px;
          }

          .title {
            font-size: 22px;
            font-weight: 800;
            color: #ffffff;
            line-height: 1.2;
            white-space: nowrap;
          }

          .badge-group {
            display: flex;
            gap: 8px;
            flex-wrap: wrap;
            align-items: center;
          }

          .badge {
            padding: 5px 10px;
            border-radius: 999px;
            font-size: 11px;
            font-weight: 800;
            letter-spacing: 0.8px;
            white-space: nowrap;
          }

          .sensor-row {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 13px 0;
            border-bottom: 1px solid rgba(255,255,255,0.12);
          }

          .sensor-row:last-child {
            border-bottom: none;
          }

          .sensor-name {
            font-size: 18px;
            color: #d1d5db;
          }

          .sensor-value {
            min-width: 120px;
            text-align: right;
            font-size: 18px;
            font-weight: 800;
          }

          @media (max-width: 420px) {
            .inner-card {
              padding: 20px 24px;
            }

            .title {
              font-size: 20px;
            }

            .badge-group {
              gap: 6px;
            }

            .badge {
              font-size: 10px;
              padding: 4px 8px;
            }

            .sensor-name {
              font-size: 17px;
            }

            .sensor-value {
              min-width: 110px;
              font-size: 17px;
            }
          }
        </style>

        <div class="card">
          <div class="inner-card">
            <div class="header">
              <div class="title">${this.config.title}</div>

              <div class="badge-group">
                <div class="badge" style="color:${statusBadge.color}; background:${statusBadge.background}; border:1px solid ${statusBadge.color};">
                  ${statusBadge.label}
                </div>
                <div class="badge" style="color:${deviceBadge.color}; background:${deviceBadge.background}; border:1px solid ${deviceBadge.color};">
                  ${deviceBadge.label}
                </div>
              </div>
            </div>

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
        </div>
      </ha-card>
    `;
  }

  getCardSize() {
    return 3;
  }
}

customElements.define("tugs-garage-diagnostic-card", TugsGarageDiagnosticCard);
