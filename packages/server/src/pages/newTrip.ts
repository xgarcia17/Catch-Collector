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
            <trip-form class="form-container"></trip-form>
        </mu-auth>
    </body>
    `;
  }
}