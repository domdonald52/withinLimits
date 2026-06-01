# Performance engine validation

## Overview

This document records validation traces against the NZ CAA P-charts for the three
aircraft currently supported in the app (PA-38, C172N, C152). The goal is
*faithful reproduction* of the P-charts including their known non-linearities
in the wind and slope correction nomographs.

## Engine model (v96+)

- **Wind**: piecewise `pct_per_kt` table keyed by base distance (post-slope). Linear
  interpolation between sample points. Separate tables for takeoff/landing and
  HW/TW. Stored in shared file `perf-nz-corrections.js`.
- **Slope**: 2D piecewise grid (base distance × slope %). Bilinear interpolation
  between sample points. Separate grids for takeoff/landing.

All three aircraft (PA-38, C172N, C152) share the same wind and slope nomographs
on their P-charts, verified by tracing all three at multiple base × correction
combinations and confirming agreement within reading uncertainty (~5-10 m).

## Wind traces (shared across all 3 aircraft)

### Takeoff HW @ 10 kt

| Base | Result | Δ | %/kt |
|------|-------:|----:|-----:|
| 400  | 350    | -50 | 1.25 |
| 500  | 440    | -60 | 1.20 |
| 600  | 520    | -80 | 1.33 |
| 700  | 615    | -85 | 1.21 |
| 800  | 705    | -95 | 1.19 |
| 900  | 795    | -105| 1.17 |
| 1000 | 880    | -120| 1.20 |
| 1100 | 980    | -120| 1.09 |
| 1200 | 1075   | -125| 1.04 |

### Takeoff TW @ 5 kt

| Base | Result | Δ | %/kt |
|------|-------:|---:|-----:|
| 300  | 360    | +60| 4.00 |
| 400  | 480    | +80| 4.00 |
| 500  | 595    | +95| 3.80 |
| 600  | 715    |+115| 3.83 |
| 700  | 825    |+125| 3.57 |
| 800  | 925    |+125| 3.12 |
| 900  | 1050   |+150| 3.33 |
| 1000 | 1140   |+140| 2.80 |

### Landing HW @ 10 kt

| Base | Result | Δ | %/kt |
|------|-------:|---:|-----:|
| 300  | 255    | -45| 1.50 |
| 400  | 340    | -60| 1.50 |
| 500  | 430    | -70| 1.40 |
| 600  | 525    | -75| 1.25 |
| 700  | 620    | -80| 1.14 |
| 800  | 723    | -77| 0.96 |
| 900  | 815    | -85| 0.94 |
| 1000 | 908    | -92| 0.92 |

### Landing TW @ 5 kt

| Base | Result | Δ | %/kt |
|------|-------:|---:|-----:|
| 300  | 360    | +60| 4.00 |
| 400  | 483    | +83| 4.15 |
| 500  | 602    |+102| 4.08 |
| 600  | 708    |+108| 3.60 |
| 700  | 807    |+107| 3.06 |
| 800  | 912    |+112| 2.80 |
| 900  | 1010   |+110| 2.44 |
| 1000 | 1105   |+105| 2.10 |

## Slope traces (shared across all 3 aircraft)

### Takeoff slope grid (factor = result/base)

| Base | -2%   | -1%   | 0%    | +1%   | +2%   | +3%   |
|------|------:|------:|------:|------:|------:|------:|
| 400  | 0.9125| 0.9500| 1.0000| 1.0500| 1.1125| 1.2000|
| 700  | 0.8571| 0.9286| 1.0000| 1.0857| 1.1857| 1.3143|
| 1000 | 0.8400| 0.9000| 1.0000| 1.1200| 1.2600| OOR   |

### Landing slope grid

| Base | -2%   | -1%   | 0%    | +1%   | +2%   | +3%   |
|------|------:|------:|------:|------:|------:|------:|
| 400  | 1.1500| 1.0625| 1.0000| 0.9375| 0.8750| 0.8250|
| 700  | 1.2429| 1.1143| 1.0000| 0.9071| 0.8286| 0.7571|
| 1000 | OOR   | 1.1600| 1.0000| 0.8800| 0.7900| 0.7300|

## Spot checks confirming shared nomograph

| Aircraft | Test | Expected | Traced | Δ |
|----------|------|---------:|-------:|--:|
| C172N    | T/O base 600, 10 kt HW | 520 | 520 | 0 |
| C172N    | T/O base 600, 5 kt TW  | 715 | 715 | 0 |
| C152     | T/O base 600, 10 kt HW | 520 | 520 | 0 |
| C152     | T/O base 600, 5 kt TW  | 715 | 715 | 0 |
| C172N    | LDG base 700, +2% slope| 580 | 580 | 0 |
| C152     | LDG base 700, +2% slope| 580 | 580 | 0 |

## Engine smoke tests (v96)

Test against PA-38 PPD baseline at SL/15°C (d_ppd 440 m T/O, 490 m LDG):

| Test | Expected | Engine | Pass |
|------|---:|---:|:---:|
| T/O baseline | 440 | 440.0 | ✓ |
| T/O 10 kt HW | ~387 | 385.9 | ✓ |
| T/O 5 kt TW  | ~526 | 526.2 | ✓ |
| T/O +1% slope | ~464 | 464.1 | ✓ |
| T/O +2% slope | ~494 | 493.8 | ✓ |
| T/O +3% slope | ~534 | 534.7 | ✓ |
| LDG baseline | 490 | 490.0 | ✓ |
| LDG 10 kt HW | ~421 | 420.9 | ✓ |
| LDG 5 kt TW  | ~590 | 590.1 | ✓ |
| LDG +1% slope | ~455 | 454.9 | ✓ |
| LDG +2% slope | ~422 | 421.9 | ✓ |
| LDG -1% slope | ~528 | 528.2 | ✓ |

All engine outputs match chart-derived expectations within ±2 m. Reading
uncertainty of source traces is ~5-10 m.

## OOR behaviour

- **Headwind > 20 kt**: amber caution. Distance shown is a safe upper bound.
  Still GO if floor ≤ TORA.
- **Tailwind > 5 kt**: NO-GO. Chart-floor underestimates the penalty.
- **Envelope OOR (PA/elev/OAT outside chart range)**: NO-GO.
- **Slope OOR (e.g. +3% slope at base 1000 m off-chart)**: NO-GO.

## Known limitations

1. Chart traces have ~5-10 m reading precision; the piecewise model can't be
   more precise than its inputs.
2. At extreme combinations (high base + high slope) the chart may go off-page.
   Engine returns OOR.
3. PA-38 takeoff PA grid extends to ~3000 ft PA only. Beyond that the engine
   extrapolates the PA × OAT bilinear surface.
4. The shared NZ_PCHART_CORRECTIONS object is for NZ-standard P-charts only.
   Other aircraft need their own correction tables.
