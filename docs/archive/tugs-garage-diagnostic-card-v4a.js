class TugsGarageDiagnosticCard extends HTMLElement {
  setConfig(config) {
    this.config = config;
  }

  set hass(hass) {
    this.innerHTML = `
      <ha-card>
        <div style="padding: 20px; background: #111; color: white;">
          <h2>${this.config.title || "Tug's Garage Diagnostic Card"}</h2>
          <p>V4A Loaded Successfully</p>
        </div>
      </ha-card>
    `;
  }
}

customElements.define("tugs-garage-diagnostic-card", TugsGarageDiagnosticCard);
