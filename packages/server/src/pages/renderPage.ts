import { PageParts, renderWithDefaults } from "@calpoly/mustang/server";

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

export default function renderPage(page: PageParts) {
    return renderWithDefaults(page, defaults);
}