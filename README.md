# Tug's Garage Diagnostic Trend Card

---

> ⚠️ Early Prototype
>
> This project is under active development and is not yet ready for production use.

---

## Project Goal

Turn historical sensor data into actionable equipment diagnostics.

Most trend charts show data.

The Tug's Garage Diagnostic Trend Card is being designed to help homeowners, DIYers, and maintenance professionals understand what their equipment is trying to tell them before it fails.

The goal is not simply to display sensor values, but to identify patterns, trends, abnormalities, and opportunities for predictive maintenance.

---

## Tug's Garage Diagnostic Color Standard

The Tug's Garage Diagnostic Trend Card follows a consistent color convention across Home Assistant dashboards, GitHub projects, and future custom cards.

| Metric | Color | Hex |
|---------|---------|---------|
| Power | Green | #4CAF50 |
| Current | Blue | #4A90E2 |
| Voltage | Magenta | #E040FB |
| Power Factor | Amber | #FFB300 |
| Alarm / Fault | Red | #F44336 |
| Target / Reference | White | #FFFFFF |
| Baseline / Average | Gray | #9E9E9E |

Using a standardized color convention allows equipment diagnostics to be interpreted quickly and consistently across different projects.

## Planned Features

- Baseline / Average Overlay
- Target / Expected Overlay
- Runtime Shading
- Alarm Markers
- Inrush Current Visualization
- Home Assistant Entity Support

---

## Why This Project Exists

While monitoring equipment in Home Assistant, a limitation became apparent:

Traditional charts display historical data, but they do not provide an easy way to inspect trends, compare baselines, or diagnose equipment behavior directly from a mobile device.

The original concept was simple:

> Why can't I drag my finger across a chart and inspect exactly what happened at that point in time?

That question became the foundation for this project.

---

## Version 1 Milestone

The first prototype successfully demonstrates:

- Interactive touch-based history inspection
- Mobile-friendly operation
- Real-time data readout
- GitHub Pages deployment
- Custom chart rendering independent of Home Assistant

### Current Functionality

- Drag finger across chart
- View timestamp
- View sensor value
- Inspect historical data from any mobile device

---

## Planned Features

### Phase 2

- Smooth diagnostic cursor
- Multiple data traces
- Tug's Garage color standards

### Phase 3

- Baseline overlays
- Historical averages
- Alarm markers
- Event markers

### Phase 4

- Cycle detection
- Runtime analysis
- Peak demand tracking
- Inrush current visualization
- Equipment health indicators

### Phase 5

- Home Assistant custom card
- YAML configuration
- HACS distribution

---

## Intended Applications

### Electrical Monitoring

- Power
- Current
- Voltage
- Power Factor
- Energy Consumption

### Environmental Monitoring

- Temperature
- Humidity
- Dew Point

### Equipment Diagnostics

- Sump Pumps
- Well Pumps
- Freezers
- Refrigerators
- Dehumidifiers
- HVAC Systems
- Custom Equipment

---

## Tug's Garage Philosophy

Monitor first.

Understand second.

Diagnose third.

Predict fourth.

The objective is to provide useful information that helps identify developing problems before they become failures.

---

## Project Status

**Current Version:** Prototype V1

**Status:** Active Development

**Created By:** Tug's Garage

Website:

https://spatrickohio.github.io/tugs-garage/
