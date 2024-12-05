import { PageParts, renderWithDefaults } from "@calpoly/mustang/server";

const defaults = {
    stylesheets: [
        "/styles/reset.css",
        "/styles/tokens.css",
        "/styles/page.css",
        "/styles/trips.css",
        "/styles/favorite.css",
    ],
    styles: [],
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

export default function renderPage(page: PageParts) {
    return renderWithDefaults(page, defaults);
}