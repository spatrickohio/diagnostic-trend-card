# Build Instructions

TG-WO-2026-004 · November 14, 2026

On a test Home Assistant, place the exact V11 file in the configuration folder's `www` subdirectory, such as `/config/www/tugs-garage-diagnostic-card-v11-working.js`. Register `/local/tugs-garage-diagnostic-card-v11-working.js` as a JavaScript module in Settings → Dashboards → Resources, or use the matching resource in YAML mode. First-time creation of `www` may require a restart. Use one module for the custom element at a time. Copy this example into a manual test card, using an existing numeric test sensor. It illustrates the source API and is not the owner's installed YAML.

```yaml
type: custom:tugs-garage-diagnostic-card
title: Sump Pump Monitoring
sensors:
  - key: power
    entity: sensor.athom_nr1_power
    name: Power
    unit: W
  - key: power_factor
    entity: sensor.athom_nr1_power_factor
    name: Power Factor
    color: "#FFB300"
    decimals: 2
```

Add current, voltage or energy by mapping the actual entities. Enter approved measured thresholds separately under `status_rules`. [HA resource guide](https://contributors.home-assistant.io/frontend/custom-ui/resources/)
