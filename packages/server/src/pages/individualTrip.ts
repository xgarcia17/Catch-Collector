import { css, html } from "@calpoly/mustang/server";
import { Trip } from "../models/trips";
import renderPage from "./renderPage";

export class IndividualTripPage {
    tripID: string;

    // get trip by one tripID
    constructor(tripID: string) {
        this.tripID = tripID;
    }

    render() {
        return renderPage({
            body: this.renderBody()
        });
    }

    renderBody() {
        console.log(`\ntripID = ${this.tripID}`);

        return html`
        <body class="page">
            <header>
                <div class="header-title">
                    <a href="/index.html"><h1>Catch Collector</h1></a>
                    <h1>&nbsp&nbsp|&nbsp Your Trips</h1>
                </div>
                <div class="header-contents">
                    <label onchange="relayEvent(event, 'light-view', {checked: event.target.checked})">
                        <input type="checkbox" autocomplete="off" />
                        <h2>&nbspLight View</h2>
                    </label>
                    <h2>Xavier G.</h2>
                </div>
            </header>
            <trip-details class="trip-section-block" src="/api/trips?tripID=${this.tripID}"></trip-details>
        </body>
        `
    }
}