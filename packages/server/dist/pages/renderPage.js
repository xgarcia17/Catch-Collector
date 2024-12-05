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
    "/styles/trips.css",
    "/styles/favorite.css"
  ],
  styles: [
    import_server.css`
        .favorite-form-title {
            text-align: center;
        }
        .favorite-form-container {
            padding: var(--margin-tiny); /* Add spacing inside the container */
            background-color: var(--color-large-header-background); /* Light gray background */
            border-radius: 8px; /* Rounded corners */
            max-width: 500px; /* Optional: constrain width for better appearance */
            margin: var(--margin-small) auto; /* Center the container horizontally and add vertical spacing */

            h3, span {
            color: var(--color-large-header);
            }
        }
        .favorite-form {
            display: flex;
            flex-direction: column; /* Stack children vertically */
            gap: 0.2em; /* Add space between form fields */
            max-width: 400px; /* Optional: limit the width of the form */
            margin: 0 auto; /* Optional: center the form horizontally */
            margin-bottom: var(--margin-tiny);
        }
        .favorite-form mu-form.edit {
            display: flex;
            flex-direction: column; /* Stack labels vertically */
            gap: 1em; /* Add space between labels */
        }
        .favorite-form label {
            display: flex;
            flex-direction: column; /* Stack label text and input vertically */
            gap: 0.5em; /* Add space between text and input */
        }
        .favorite-form input {
            padding: 0.5em; /* Add padding for a better look */
            border: 1px solid #ccc; /* Add border for inputs */
            border-radius: 4px; /* Rounded corners */
            font-size: 1em; /* Adjust font size */
            width: 100%; /* Make inputs full-width */
            box-sizing: border-box; /* Ensure padding doesn't affect width */
        }
        `
  ],
  scripts: [
    `      
        import { Events, Auth, define } from "@calpoly/mustang";
        import { TripDetails } from "/scripts/TripDetails.js";
        import { HeaderElement } from "../scripts/header.js";

        window.relayEvent = Events.relay;

        define({
          "trip-details": TripDetails,
          "custom-header": HeaderElement,
          "mu-auth": Auth.Provider
        });
        HeaderElement.initializeOnce();
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
