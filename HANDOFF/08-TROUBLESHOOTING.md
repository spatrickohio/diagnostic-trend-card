# Troubleshooting

TG-WO-2026-004 · November 14, 2026

Unknown custom element usually calls for checking the resource URL/type, browser cache and whether multiple versions are registered. No sensor rows: verify `sensors:` (older V4B uses `series:`). Wrong value: inspect the configured entity and unit in HA Developer Tools → States. Badge thresholds: check the key and numeric state. Device status and system status are separate. When all sensors are unavailable and thresholds are skipped the display can show OFFLINE and NORMAL together. Investigate via HA sensor history or automation logs.
