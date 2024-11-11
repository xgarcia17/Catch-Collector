"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var trips_svc_exports = {};
__export(trips_svc_exports, {
  getTrips: () => getTrips
});
module.exports = __toCommonJS(trips_svc_exports);
const trips = [
  {
    tripName: "[SERVICE] Laguna Lake",
    tripDate: /* @__PURE__ */ new Date("2024-9-16"),
    location: "Laguna Lake, San Luis Obispo, CA",
    startTime: "8:15 AM",
    endTime: "11:26 PM",
    weather: ["Sunny"],
    startTemp: "56\xB0F",
    endTemp: "72\xB0F",
    catches: [
      "2 Largemouth Bass",
      "1 Bluegill"
    ]
  },
  {
    tripName: "Morro Strand State Beach",
    tripDate: /* @__PURE__ */ new Date("2024-10-13"),
    location: "Morro Strand State Beach, Morro Bay, CA",
    startTime: "11:17 AM",
    endTime: "1:54 PM",
    weather: ["Overcast", "Windy"],
    startTemp: "53\xB0F",
    endTemp: "65\xB0F",
    catches: ["3 Surfperch"]
  },
  {
    tripName: "Halloween at Morro Bay",
    tripDate: /* @__PURE__ */ new Date("2024-10-31"),
    location: "Morro Strand State Beach, Morro Bay, CA",
    startTime: "8:00 AM",
    endTime: "11:34 AM",
    weather: ["Overcast"],
    startTemp: "48\xB0F",
    endTemp: "56\xB0F",
    catches: ["1 Smelt", "2 Surfperch"]
  }
];
function getTrips() {
  return trips;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  getTrips
});
