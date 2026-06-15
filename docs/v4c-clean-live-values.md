# V4C - Clean Live Values

## Date Completed
June 15, 2026

---

## Objective

Transition the Tug's Garage Diagnostic Card from a proof-of-concept framework to a clean live-data dashboard using actual Home Assistant entities.

---

## Features Added

### Live Entity Support

Successfully connected the custom card to live Home Assistant sensors.

Entities tested:

- sensor.athom_nr1_power
- sensor.athom_nr1_current
- sensor.athom_nr1_voltage
- sensor.athom_nr1_power_factor

---

### Clean Value Formatting

Values now display with appropriate precision:

| Metric | Example |
|----------|----------|
| Power | 0.0 W |
| Current | 0.00 A |
| Voltage | 121.5 V |
| Power Factor | 1.00 |

This removes excessive decimal places and improves readability.

---

### Tug's Garage Color Standard Implemented

| Metric | Color | Hex |
|----------|----------|----------|
| Power | Green | #4CAF50 |
| Current | Blue | #4A90E2 |
| Voltage | Magenta | #E040FB |
| Power Factor | Amber | #FFB300 |
| Alarm | Red | #F44336 |
| Target | White | #FFFFFF |
| Baseline | Gray | #9E9E9E |

---

### User Interface Improvements

- Clean card layout
- Rounded metric rows
- Consistent spacing
- Improved readability
- Mobile friendly design

---

## Resource Version

Current Home Assistant resource:

`/local/tugs-garage-diagnostic-card.js?v=4`

---

## Screenshot

Insert V4C screenshot below.

![V4C Screenshot](https://github.com/spatrickohio/diagnostic-trend-card/blob/c5dbad9a5b8b7dae3cfce12a21e6f7569a76f200/docs/Images/Screenshot_V4C_Home%20Assistant.jpg)

---

## Status

✅ V4C Complete

The Diagnostic Card is now successfully displaying live Home Assistant data using the official Tug's Garage color convention.

---

## Next Milestone

### V4D - Energy Support

Planned additions:

- Energy entity support
- Fifth metric row
- Expanded configuration options

Future development will continue toward the Tug's Garage Baseline Engine.
