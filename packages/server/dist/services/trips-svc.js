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
  default: () => trips_svc_default
});
module.exports = __toCommonJS(trips_svc_exports);
var import_mongoose = require("mongoose");
const TripSchema = new import_mongoose.Schema(
  {
    userID: { type: String, required: true, trim: true },
    tripName: { type: String, required: true },
    tripDate: { type: Date, required: true },
    location: { type: String, required: true },
    startTime: { type: String, required: true },
    endTime: { type: String, required: true },
    weather: [{ type: String, required: true }],
    startTemp: { type: String, required: true },
    endTemp: { type: String, required: true },
    catches: [{ type: String, required: true }]
  },
  { collection: "trips" }
);
const TripModel = (0, import_mongoose.model)("Trip", TripSchema);
function getTrips() {
  return TripModel.find({ userID: "1" }).then((list) => list).catch((err) => {
    throw `tripID: 1 Not Found`;
  });
  ;
}
function index() {
  return TripModel.find();
}
function getTripsByUserID(userID) {
  return TripModel.find({ userID }).then((list) => list).catch((err) => {
    throw `tripID: ${userID} Not Found`;
  });
}
var trips_svc_default = { index, getTripsByUserID, getTrips };
