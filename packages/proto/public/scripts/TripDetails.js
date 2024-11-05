import { css, html, shadow } from "@calpoly/mustang";
import reset from "./styles/reset.css.js";

export class TripDetails extends HTMLElement {
  static template = html`
    <template>
      <trip-details class="trip-section-block">
        <dt><span slot="trip-title-text">Halloween at Morro Bay</span> : <span slot="trip-title-date">Thu, 10/31/2024</span></dt>
        <ul>
            <dd><strong>Location:</strong> <span slot="location">Morro Strand State Beach, Morro Bay, CA<span></dd>
            <dd><strong>Date:</strong> <span slot="date">Thursday, October 31, 2024<span></dd>
            <dd><strong>Time:</strong> <span slot="time">8:10 AM - 11:00 AM<span></dd>
            <dd><strong>Weather:</strong> <span slot="weather">Overcast, Start Temp: 47°F, End Temp: 56°F<span></dd>
            <dd><strong>Catches:</strong> <span slot="catches">1 Smelt, 3 Surfperch<span></dd>
        </ul>
      </trip-details>
    </template>
  `;

  static styles = css`
    .trip-section-block {
      margin-bottom: var(--margin-tiny);
      display: contents;
    }
    dt {
      grid-column: 1 / 3;
      margin-left: var(--margin-small);
      color: var(--color-small-header);
    }
    dd {
      color: var(--color-basic-text);
    }
    ul {
      grid-column: 3 / 5;
    }
  `;

  constructor() {
    super();
    shadow(this)
      .template(TripDetails.template)
      .styles(reset.styles, TripDetails.styles);
  }
}