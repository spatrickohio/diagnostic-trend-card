# System Architecture

TG-WO-2026-004 · November 14, 2026

One browser class extends HTMLElement, registers `tugs-garage-diagnostic-card`, reads `hass.states` and renders in `ha-card`. A sensor needs a matching entity ID and uses key, display name, optional decimals, unit and color. `status_rules` refers to the sensor key and accepts `warning_low`, `warning_high`, `fault_low` and `fault_high`. Comparisons are strict, fault takes precedence and missing/non-numeric readings skip threshold evaluation. Availability is ONLINE, UNKNOWN or OFFLINE based on valid state counts. `docs/archive` holds earlier source snapshots and old V4B YAML. Its `series` shape cannot be pasted into V11 as-is.
