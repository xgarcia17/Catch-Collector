import { css, html } from "@calpoly/mustang/server";
import { Trip } from "../models/trips";
import renderPage from "./renderPage";

export class TripsPage {
    data: Array<Trip>;

    // personal note: called in /server/src/index.ts to get all trips
    constructor(data: Array<Trip>) {
        this.data = data;
    }

    render() {
        return renderPage({
            body: this.renderBody()
        });
    }

    renderTrip(trip: Trip) {
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

        // format dates
        const longDateFormatted = new Intl.DateTimeFormat('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }).format(tripDate);
        const dayName = new Intl.DateTimeFormat('en-US', { weekday: 'short' }).format(tripDate);
        const shortDateFormatted = `${dayName}, ${tripDate.getMonth()+1}/${tripDate.getDate()}/${tripDate.getFullYear()}`;

        // format weather
        let weatherStr: string = "";
        for (let i: number = 0; i < weather.length; i ++) {
            weatherStr += weather[i] + ", "
        }
        weatherStr.slice(0, -2);

        // format catches
        let catchesStr: string = "";
        for (let i: number = 0; i < catches.length; i ++) {
            catchesStr += catches[i] + ", ";
        }
        catchesStr.slice(0, -2);

        return html`
        <trip-details class="trip-section-block">
            <slot slot="trip-title-text">${tripName}</slot>
            <time slot="trip-title-date">${shortDateFormatted}</time>
            <slot slot="location">${location}</slot>
            <time slot="date">${longDateFormatted}</time>
            <time slot="start-time">${startTime}</time>
            <time slot="end-time">${endTime}</time>
            <slot slot="weather">${weatherStr}</slot>
            <slot slot="start-temp">${startTemp}</slot>
            <slot slot="end-temp">${endTemp}</slot>
            <slot slot="catches">${catchesStr}</slot>
        </trip-details>
        `
    }

    renderBody() {
        console.log(`\n\ntrips = ${this.data}`);
        const tripsList = this.data.map((trip: Trip) =>
            this.renderTrip(trip)
        );

        return html`
        <body class="page">
            <mu-auth provides="catch-collector:auth">
                <custom-header>
                    <slot slot="page-title">Your Trips</slot>
                </custom-header>
                ${tripsList}
            </mu-auth>
        </body>
        `
    }
}