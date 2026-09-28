"""Refresh every market's `fema_nri` block from one FEMA National Risk Index county table.

All markets must use the same NRI release or their storm-loss figures aren't comparable.

Usage:
    python3 scripts/refresh_nri.py path/to/NRI_Table_Counties.csv [market ...]

The official table is at https://hazards.fema.gov/nri/data-resources. That site is blocked
from the research sandbox, so round 1 used an unmodified GitHub copy:
https://raw.githubusercontent.com/ooowen-unc/flood_set/main/NRI_Table_Counties.csv
"""
import csv
import json
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
SOURCE_URL = "https://raw.githubusercontent.com/ooowen-unc/flood_set/main/NRI_Table_Counties.csv"
OFFICIAL_URL = "https://hazards.fema.gov/nri/data-resources"

# Primary county (5-digit FIPS) per market; must match the market research memo.
PRIMARY = {
    "austin": "48453", "san-antonio": "48029", "hampton-roads": "51710",
    "culbertson": "51153", "laurel": "24033",
}
HAZARDS = {
    "hail": "HAIL", "strong_wind": "SWND", "tornado": "TRND", "hurricane": "HRCN",
    "winter_weather": "WNTW", "ice_storm": "ISTM", "riverine_flooding": "IFLD",
    "coastal_flooding": "CFLD", "heat_wave": "HWAV", "cold_wave": "CWAV", "lightning": "LTNG",
}


def num(v):
    try:
        return float(v)
    except (TypeError, ValueError):
        return None


def main(csv_path, only=None):
    rows = {r["STCOFIPS"].zfill(5): r for r in csv.DictReader(open(csv_path, encoding="utf-8-sig"))}
    for market, fips in PRIMARY.items():
        path = ROOT / "data" / "markets" / f"{market}.json"
        if not path.exists() or (only and market not in only):
            continue
        r = rows[fips]
        data = json.loads(path.read_text())
        old = data.get("fema_nri", {})
        data["fema_nri"] = {
            "county": f"{r['COUNTY']} {r['COUNTYTYPE']}, {r['STATEABBRV']} ({fips})",
            "overall_risk_rating": r["RISK_RATNG"],
            "risk_score": num(r["RISK_SCORE"]),
            "nri_version": r["NRI_VER"],
            "building_value_usd": num(r["BUILDVALUE"]),
            "eal_building_all_hazards_usd": num(r["EAL_VALB"]),
            "hazards": {
                key: {
                    "rating": r[f"{code}_RISKR"] or None,
                    "annualized_frequency": num(r[f"{code}_AFREQ"]),
                    "eal_building_usd": num(r[f"{code}_EALB"]),
                }
                for key, code in HAZARDS.items()
            },
            "sources": [
                {"name": "FEMA National Risk Index, county table (official)", "url": OFFICIAL_URL},
                {"name": "Unmodified GitHub copy used for this refresh", "url": SOURCE_URL},
            ],
            "note": "Refreshed by scripts/refresh_nri.py so every market uses the same NRI release. "
                    "annualized_frequency = county-wide events/yr, not hits on one building.",
        }
        # Keep the research's own NRI notes and extra fields (secondary counties, percentiles)
        # for reference. They may come from an older release, so they sit apart from the live values.
        prior = old.get("research_fields") or {k: v for k, v in old.items() if k != "hazards"}
        if prior:
            data["fema_nri"]["research_fields"] = prior
        path.write_text(json.dumps(data, indent=2, ensure_ascii=False) + "\n")
        print(f"{market:16s} {data['fema_nri']['county']:40s} {r['NRI_VER']}  risk={r['RISK_RATNG']}")


if __name__ == "__main__":
    main(sys.argv[1], sys.argv[2:] or None)
