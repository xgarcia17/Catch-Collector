import { PageParts, css, renderWithDefaults } from "@calpoly/mustang/server";

const defaults = {
    stylesheets: [
        "/styles/reset.css",
        "/styles/tokens.css",
        "/styles/page.css",
        "/styles/trips.css",
        "/styles/favorite.css",
    ],
    styles: [
        css`
        .form-container {
            padding-top: -1 * var(--margin-tiny);
            margin-left: var(--margin-small);
            margin-right: var(--margin-small);
            margin-bottom: var(--margin-small);
            grid-column: 1 / 5;
        }

        .new-trip-form-title {
            text-align: center;
        }
        
        .new-trip-form-container {
            padding: var(--margin-tiny); /* Add spacing inside the container */
            background-color: var(--color-large-header-background); /* Light gray background */
            border-radius: 8px; /* Rounded corners */
            max-width: 500px; /* Optional: constrain width for better appearance */
            margin: var(--margin-small) auto; /* Center the container horizontally and add vertical spacing */
        
            h3, span {
                color: var(--color-large-header);
            }
        }
        
        .new-trip-form {
            display: flex;
            flex-direction: column; /* Stack children vertically */
            gap: 0.2em; /* Add space between form fields */
            max-width: 400px; /* Optional: limit the width of the form */
            margin: 0 auto; /* Optional: center the form horizontally */
            margin-bottom: var(--margin-tiny);
        }
        
        .new-trip-form mu-form.edit {
            display: flex;
            flex-direction: column; /* Stack labels vertically */
            gap: 1em; /* Add space between labels */
        }
        
        .new-trip-form label {
            display: flex;
            flex-direction: column; /* Stack label text and input vertically */
            gap: 0.5em; /* Add space between text and input */
        }
        
        .new-trip-form input {
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

export default function renderPage(page: PageParts) {
    return renderWithDefaults(page, defaults);
}