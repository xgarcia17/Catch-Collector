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
const TripModel = (0, import_mongoose.model)("Trips", TripSchema);
function index() {
  return TripModel.find().then((list) => list).catch((err) => {
    throw `trip collection Not Found`;
  });
}
function getTripsByUserID(userID) {
  return TripModel.find({ userID }).then((list) => list).catch((err) => {
    throw `tripID: ${userID} Not Found`;
  });
}
function getTripByTripID(tripID) {
  return TripModel.find({ _id: tripID }).then((list) => list[0]).catch((err) => {
    throw `tripID: ${tripID} Not Found`;
  });
}
function create(json) {
  const trip = new TripModel(json);
  return trip.save();
}
function update(tripID, trip) {
  return TripModel.findOneAndUpdate({ _id: tripID }, trip, {
    new: true
  }).then((updated) => {
    if (!updated) throw `${tripID} not updated`;
    else return updated;
  });
}
function remove(tripID) {
  return TripModel.findOneAndDelete({ _id: tripID }).then(
    (deleted) => {
      if (!deleted) throw `${tripID} not deleted`;
    }
  );
}
var trips_svc_default = { index, getTripByTripID, getTripsByUserID, create, update, remove };
