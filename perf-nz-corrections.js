// Shared NZ P-chart wind & slope corrections.
// Traced from PA-38, C172N, and C152 NZ CAA-standard P-charts. All three share the
// same wind and slope nomographs (verified by spot-checks against PA-38 baseline).
// Reference: chart traces collected during validation; see VALIDATION.md.
//
// Each aircraft perf data file can opt in via:
//   wind_factor_takeoff: window.NZ_PCHART_CORRECTIONS.wind.takeoff,
//   wind_factor_landing: window.NZ_PCHART_CORRECTIONS.wind.landing,
//   slope_factor_takeoff: window.NZ_PCHART_CORRECTIONS.slope.takeoff,
//   slope_factor_landing: window.NZ_PCHART_CORRECTIONS.slope.landing,
//
// Wind: pct_per_kt by base distance (m). Engine interpolates to current base distance.
// Slope: 2D grid (base_m × slope_pct → factor). Engine bilinearly interpolates.
window.NZ_PCHART_CORRECTIONS = {
  wind: {
    takeoff: {
      headwind_pct_per_kt_by_base: [
        { base_m: 400,  pct: 0.01250 },
        { base_m: 500,  pct: 0.01200 },
        { base_m: 600,  pct: 0.01333 },
        { base_m: 700,  pct: 0.01214 },
        { base_m: 800,  pct: 0.01188 },
        { base_m: 900,  pct: 0.01167 },
        { base_m: 1000, pct: 0.01200 },
        { base_m: 1100, pct: 0.01091 },
        { base_m: 1200, pct: 0.01042 },
      ],
      tailwind_pct_per_kt_by_base: [
        { base_m: 300,  pct: 0.04000 },
        { base_m: 400,  pct: 0.04000 },
        { base_m: 500,  pct: 0.03800 },
        { base_m: 600,  pct: 0.03833 },
        { base_m: 700,  pct: 0.03571 },
        { base_m: 800,  pct: 0.03125 },
        { base_m: 900,  pct: 0.03333 },
        { base_m: 1000, pct: 0.02800 },
      ],
      max_headwind_kt: 20,
      max_tailwind_kt: 5,
    },
    landing: {
      headwind_pct_per_kt_by_base: [
        { base_m: 300,  pct: 0.01500 },
        { base_m: 400,  pct: 0.01500 },
        { base_m: 500,  pct: 0.01400 },
        { base_m: 600,  pct: 0.01250 },
        { base_m: 700,  pct: 0.01143 },
        { base_m: 800,  pct: 0.00962 },
        { base_m: 900,  pct: 0.00944 },
        { base_m: 1000, pct: 0.00920 },
      ],
      tailwind_pct_per_kt_by_base: [
        { base_m: 300,  pct: 0.04000 },
        { base_m: 400,  pct: 0.04150 },
        { base_m: 500,  pct: 0.04080 },
        { base_m: 600,  pct: 0.03600 },
        { base_m: 700,  pct: 0.03057 },
        { base_m: 800,  pct: 0.02800 },
        { base_m: 900,  pct: 0.02444 },
        { base_m: 1000, pct: 0.02100 },
      ],
      max_headwind_kt: 20,
      max_tailwind_kt: 5,
    },
  },
  slope: {
    // Sign convention: positive slope_pct = upslope on the takeoff/landing direction of travel.
    // Takeoff upslope extends distance (factor > 1); landing upslope shortens (factor < 1).
    takeoff: {
      grid: [
        { base_m: 400, by_slope: [
          { slope_pct: -2, factor: 0.9125 },
          { slope_pct: -1, factor: 0.9500 },
          { slope_pct:  0, factor: 1.0000 },
          { slope_pct: +1, factor: 1.0500 },
          { slope_pct: +2, factor: 1.1125 },
          { slope_pct: +3, factor: 1.2000 },
        ]},
        { base_m: 700, by_slope: [
          { slope_pct: -2, factor: 0.8571 },
          { slope_pct: -1, factor: 0.9286 },
          { slope_pct:  0, factor: 1.0000 },
          { slope_pct: +1, factor: 1.0857 },
          { slope_pct: +2, factor: 1.1857 },
          { slope_pct: +3, factor: 1.3143 },
        ]},
        { base_m: 1000, by_slope: [
          { slope_pct: -2, factor: 0.8400 },
          { slope_pct: -1, factor: 0.9000 },
          { slope_pct:  0, factor: 1.0000 },
          { slope_pct: +1, factor: 1.1200 },
          { slope_pct: +2, factor: 1.2600 },
          // +3% at base 1000 is off-chart
        ]},
      ],
    },
    landing: {
      grid: [
        { base_m: 400, by_slope: [
          { slope_pct: -2, factor: 1.1500 },
          { slope_pct: -1, factor: 1.0625 },
          { slope_pct:  0, factor: 1.0000 },
          { slope_pct: +1, factor: 0.9375 },
          { slope_pct: +2, factor: 0.8750 },
          { slope_pct: +3, factor: 0.8250 },
        ]},
        { base_m: 700, by_slope: [
          { slope_pct: -2, factor: 1.2429 },
          { slope_pct: -1, factor: 1.1143 },
          { slope_pct:  0, factor: 1.0000 },
          { slope_pct: +1, factor: 0.9071 },
          { slope_pct: +2, factor: 0.8286 },
          { slope_pct: +3, factor: 0.7571 },
        ]},
        { base_m: 1000, by_slope: [
          // -2% at base 1000 is off-chart
          { slope_pct: -1, factor: 1.1600 },
          { slope_pct:  0, factor: 1.0000 },
          { slope_pct: +1, factor: 0.8800 },
          { slope_pct: +2, factor: 0.7900 },
          { slope_pct: +3, factor: 0.7300 },
        ]},
      ],
    },
  },
};
