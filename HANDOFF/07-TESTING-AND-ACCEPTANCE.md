# Testing And Acceptance

TG-WO-2026-004 · November 14, 2026

On Debian 13 with Node 24.22.1, `node --check docs/archive/tugs-garage-diagnostic-card-v11-working.js` and `node --check docs/app.js` passed. A Node VM harness with simulated browser and HA objects passed custom-element registration, required sensor config, value formatting, color override, warnings/faults and online/partial/offline status. Headless Chromium could not launch in the audit environment because AF_UNIX sockets were restricted. On test HA, confirm registration, five sensor rows as configured, values/units, missing sensors, warning/fault changes, mobile layout and recovery back to baseline. No production resource or dashboard changes were made.

The Git bundle in the owner recovery package passed `git bundle verify`, an offline mirror clone and `git fsck --full`, including the audited baseline and the handoff branch.
