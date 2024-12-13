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
            <mu-auth provides="catch-collector:auth">
                <custom-header>
                    <slot slot="page-title">Remember This Trip?</slot>
                </custom-header>
                <trip-details class="trip-section-block" src="/api/trips?tripID=${this.tripID}"></trip-details>
            </mu-auth>
        </body>
        `;
    }
}