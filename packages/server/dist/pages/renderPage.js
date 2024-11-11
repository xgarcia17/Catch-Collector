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
var renderPage_exports = {};
__export(renderPage_exports, {
  default: () => renderPage
});
module.exports = __toCommonJS(renderPage_exports);
var import_server = require("@calpoly/mustang/server");
const defaults = {
  stylesheets: [
    "/styles/reset.css",
    "/styles/tokens.css",
    "/styles/page.css",
    "/styles/trips.css"
  ],
  styles: [],
  scripts: [
    `
        import { define } from "@calpoly/mustang";
        import { TripDetails } from "/scripts/TripDetails.js";
        import { Events } from "@calpoly/mustang"

        window.relayEvent = Events.relay;

        define({
        "trip-details": TripDetails
        });

        function toggleLightView(page, checked) {
            page.classList.toggle("light-view", checked);
        }
    
        document.body.addEventListener("light-view", (event) => 
            toggleLightView(event.currentTarget, event.detail.checked)
        );
        `
  ],
  googleFontURL: "https://fonts.googleapis.com/css2?family=Cabin+Sketch:wght@400;700&family=Fredericka+the+Great&family=Hanalei+Fill&family=New+Tegomin&family=Piedra&family=Potta+One&family=Road+Rage&display=swap",
  imports: {
    "@calpoly/mustang": "https://unpkg.com/@calpoly/mustang"
  }
};
function renderPage(page) {
  return (0, import_server.renderWithDefaults)(page, defaults);
}
