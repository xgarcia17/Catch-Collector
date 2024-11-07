import { css, html, shadow } from "@calpoly/mustang";
import reset from "./styles/reset.css.js";

export class TripDetails extends HTMLElement {
  static template = html`
    <template>
        <dt><slot name="trip-title-text"><em>trip name</em></slot> : <slot name="trip-title-date"><em>shortened trip date</em></slot></dt>
        <ul>
            <dd><strong>Location:</strong> <slot name="location"><em>location</em></slot></dd>
            <dd><strong>Date:</strong> <slot name="date"><em>full date</em></slot></dd>
            <dd><strong>Time:</strong> <slot name="start-time"><em>start slot</em></slot> - <slot name="end-time"><em>end slot</em></slot></dd>
            <dd><strong>Weather:</strong> <slot name="weather"><em>weather type</em></slot>, Start Temp: <slot name="start-temp"><em>start temp</em></slot>, End Temp: <slot name="end-temp"><em>end temp</em></slot></dd>
            <dd><strong>Catches:</strong> <slot name="catches"><em>list of catches</em></slot></dd>
        </ul>
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