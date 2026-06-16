class TugsGarageDiagnosticCard extends HTMLElement {
  setConfig(config) {
    this.config = config;

    if (!this.config.series || !Array.isArray(this.config.series)) {
      this.config.series = [];
    }
  }

  set hass(hass) {
    this._hass = hass;
    this.render();
  }

  render() {
    if (!this.config || !this._hass) return;

    const title = this.config.title || "Tug's Garage Diagnostic Card";

    const rows = this.config.series
      .map((item) => {
        const entity = this._hass.states[item.entity];
        const value = entity ? entity.state : "unavailable";
        const unit = item.unit || entity?.attributes?.unit_of_measurement || "";
        const name = item.name || item.entity;
        const color = item.color || "#9E9E9E";

        return `
          <div class="row">
            <div class="label">
              <span class="dot" style="background:${color};"></span>
              <span>${name}</span>
            </div>
            <div class="value">${value} ${unit}</div>
          </div>
        `;
      })
      .join("");

    this.innerHTML = `
      <ha-card>
        <div class="card">
          <h2>${title}</h2>
          <div class="subtitle">Prototype V4B - Live Home Assistant Entities</div>

          <div class="rows">
            ${rows}
          </div>
        </div>
      </ha-card>

      <style>
        .card {
          background: #111111;
          color: white;
          border-radius: 18px;
          padding: 18px;
          font-family: Arial, Helvetica, sans-serif;
        }

        h2 {
          margin: 0;
          font-size: 24px;
          font-weight: bold;
        }

        .subtitle {
          color: #aaaaaa;
          margin-top: 6px;
          margin-bottom: 16px;
          font-size: 15px;
        }

        .rows {
          display: grid;
          gap: 10px;
        }

        .row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          background: #1b1b1b;
          border-radius: 12px;
          padding: 12px 14px;
        }

        .label {
          display: flex;
          align-items: center;
          gap: 8px;
          font-weight: bold;
        }

        .dot {
          width: 14px;
          height: 14px;
          border-radius: 50%;
          display: inline-block;
        }

        .value {
          font-size: 18px;
          font-weight: bold;
        }
      </style>
    `;
  }

  getCardSize() {
    return 4;
  }
}

customElements.define("tugs-garage-diagnostic-card", TugsGarageDiagnosticCard);
