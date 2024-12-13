"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
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
var import_express = __toESM(require("express"));
var import_mongo = require("./services/mongo");
var import_auth = require("./pages/auth");
var import_trips = require("./pages/trips");
var import_individualTrip = require("./pages/individualTrip");
var import_newTrip = require("./pages/newTrip");
var import_trips_svc = __toESM(require("./services/trips-svc"));
var import_trips2 = __toESM(require("./routes/trips"));
var import_auth2 = __toESM(require("./routes/auth"));
(0, import_mongo.connect)("catch-collector");
const app = (0, import_express.default)();
const port = process.env.PORT || 3e3;
const staticDir = process.env.STATIC || "public";
app.use(import_express.default.static(staticDir));
app.use(import_express.default.json());
app.get("/hello", (req, res) => {
  res.send("Hello, World");
});
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
app.use("/auth", import_auth2.default);
app.use("/api/trips", import_trips2.default);
app.get(
  "/trips/:userID",
  (req, res) => {
    const { userID } = req.params;
    import_trips_svc.default.getTripsByUserID(userID).then((data) => {
      const page = new import_trips.TripsPage(data);
      res.set("Content-Type", "text/html").send(page.render());
    });
  }
);
app.get("/trips", (req, res) => {
  if (Object.keys(req.query).length === 0) {
    console.log("rendering all trips because none provided in query");
    import_trips_svc.default.index().then((data) => {
      const page = new import_trips.TripsPage(data);
      res.set("Content-Type", "text/html").send(page.render());
    });
  } else {
    const { tripID } = req.query;
    if (tripID) {
      console.log(`
launching Individual Trip Page with tripID ${tripID}`);
      const page = new import_individualTrip.IndividualTripPage(tripID);
      res.set("Content-Type", "text/html").send(page.render());
    } else {
      res.status(400).send("Missing required query parameter: userID");
    }
  }
});
app.get("/new-trip/", (req, res) => {
  const page = new import_newTrip.NewTripFormPage();
  res.set("Content-Type", "text/html").send(page.render());
});
app.get("/login", (req, res) => {
  const page = new import_auth.LoginPage();
  res.set("Content-Type", "text/html").send(page.render());
});
