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
  TripsPage: () => TripsPage
});
module.exports = __toCommonJS(trips_exports);
var import_server = require("@calpoly/mustang/server");
var import_renderPage = __toESM(require("./renderPage"));
class TripsPage {
  data;
  // personal note: called in /server/src/index.ts to get all trips
  constructor(data) {
    this.data = data;
  }
  render() {
    return (0, import_renderPage.default)({
      body: this.renderBody()
    });
  }
  renderTrip(trip) {
    const {
      tripName,
      tripDate,
      location,
      startTime,
      endTime,
      weather,
      startTemp,
      endTemp,
      catches
    } = trip;
    const longDateFormatted = new Intl.DateTimeFormat("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" }).format(tripDate);
    const dayName = new Intl.DateTimeFormat("en-US", { weekday: "short" }).format(tripDate);
    const shortDateFormatted = `${dayName}, ${tripDate.getMonth() + 1}/${tripDate.getDate()}/${tripDate.getFullYear()}`;
    let catchesStr = "";
    for (let i = 0; i < catches.length; i++) {
      catchesStr += catches[i] + ", ";
    }
    catchesStr.slice(0, -2);
    return import_server.html`
        <trip-details class="trip-section-block">
            <slot slot="trip-title-text">${tripName}</slot>
            <time slot="trip-title-date">${shortDateFormatted}</time>
            <slot slot="location">${location}</slot>
            <time slot="date">${longDateFormatted}</time>
            <time slot="start-time">${startTime}</time>
            <time slot="end-time">${endTime}</time>
            <slot slot="weather">${weather}</slot>
            <slot slot="start-temp">${startTemp}</slot>
            <slot slot="end-temp">${endTemp}</slot>
            <slot slot="catches">${catchesStr}</slot>
        </trip-details>
        `;
  }
  renderBody() {
    console.log(`

trips = ${this.data}`);
    const tripsList = this.data.map(
      (trip) => this.renderTrip(trip)
    );
    return import_server.html`
        <body class="page">
            <mu-auth provides="catch-collector:auth">
                <custom-header>
                    <slot slot="page-title">Your Trips</slot>
                </custom-header>
                <h4><a class="new-trip-link" href="./new-trip">Log new trip</a></h4>
                ${tripsList}
            </mu-auth>
        </body>
        `;
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  TripsPage
});
