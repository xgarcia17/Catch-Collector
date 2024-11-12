"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
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
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var trips_exports = {};
__export(trips_exports, {
  default: () => trips_default
});
module.exports = __toCommonJS(trips_exports);
var import_express = __toESM(require("express"));
var import_trips_svc = __toESM(require("../services/trips-svc"));
const router = import_express.default.Router();
router.get("/", (_, res) => {
  import_trips_svc.default.index().then((list) => res.json(list)).catch((err) => res.status(500).send(err));
});
router.get("/userID=:userID", (req, res) => {
  const { userID } = req.params;
  import_trips_svc.default.getTripsByUserID(userID).then((trips) => res.json(trips)).catch((err) => res.status(404).send(err));
});
router.get("/:tripID", (req, res) => {
  const { tripID } = req.params;
  import_trips_svc.default.getTripByTripID(tripID).then((trip) => res.json(trip)).catch((err) => res.status(404).send(err));
});
router.post("/", (req, res) => {
  const newTrip = req.body;
  import_trips_svc.default.create(newTrip).then(
    (trip) => res.status(201).json(trip)
  ).catch((err) => res.status(500).send(err));
});
router.put("/:tripid", (req, res) => {
  const { tripID } = req.params;
  const newTrip = req.body;
  import_trips_svc.default.update(tripID, newTrip).then((trip) => res.json(trip)).catch((err) => res.status(404).end());
});
router.delete("/:tripID", (req, res) => {
  const { tripID } = req.params;
  import_trips_svc.default.remove(tripID).then(() => res.status(204).end()).catch((err) => res.status(404).send(err));
});
var trips_default = router;
