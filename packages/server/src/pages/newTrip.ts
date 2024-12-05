import { css, html } from "@calpoly/mustang/server";
import renderPage from "./renderPage";

export class NewTripFormPage {
  render() {
    return renderPage({
      scripts: [
        `
        import { define, Auth, Events } from "@calpoly/mustang";
        import { HeaderElement } from "../scripts/header.js";
        import { TripsForm } from "../scripts/trips-form.js"

        define({
          "mu-auth": Auth.Provider,
          "trip-form": TripsForm,
          "custom-header": HeaderElement,
        })
        window.relayEvent = Events.relay;
        `
      ],
      body: this.renderBody(),
    });
  }

  renderBody() {
    return html`
    <body class="page">
        <mu-auth provides="catch-collector:auth">
            <custom-header>
                <slot slot="page-title">Favorite Catch</slot>
            </custom-header>
            <div class="form-container">
              <div class="new-trip-form-container">
                <div class="new-trip-form">
                  <mu-form class="edit">
                    <h3 class="new-trip-form-title">Log a New Trip</h3>
                    <label>
                      <span>Trip Name</span>
                      <input name="tripName" />
                    </label>
                    <label>
                      <span>Date</span>
                      <input name="tripDate" />
                    </label>
                    <label>
                      <span>Location</span>
                      <input name="location" />
                    </label>
                    <label>
                      <span>Start Time</span>
                      <input name="startTime" />
                    </label>
                    <label>
                      <span>End Time</span>
                      <input name="endTime" />
                    </label>
                    <label>
                      <span>Weather</span>
                      <input name="weather" />
                    </label>
                    <label>
                      <span>Start Temperature</span>
                      <input name="startTemp" />
                    </label>
                    <label>
                      <span>End Temperature</span>
                      <input name="endTemp" />
                    </label>
                    <label>
                      <span>Catches</span>
                      <input name="catches" />
                    </label>
                    <slot name="submit">
                      <button type="submit">Log Trip</button>
                    </slot>
                  </mu-form>
                </div>
              </div>
            </div>
        </mu-auth>
    </body>
    `;
  }
}