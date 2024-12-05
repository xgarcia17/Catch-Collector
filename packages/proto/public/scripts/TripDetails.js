import { css, html, shadow, Observer } from "@calpoly/mustang";
import reset from "./styles/reset.css.js";

export class TripDetails extends HTMLElement {
  get src() {
    return this.getAttribute("src");
  }

  _authObserver = new Observer(this, "catch-collector:auth");

  connectedCallback() {
    this._authObserver.observe(({ user }) => {
      this._user = user;
      if (this.src) this.hydrate(this.src);
    });
  }

  get authorization() {
    return (
      this._user?.authenticated && {
        Authorization: `Bearer ${this._user.token}`
      }
    );
  }

  hydrate(url) {
    console.log("fetching url in TripDetails.js!");

    const method = "POST";
    const headers = {
      "Content-Type": "application/json"
    };

    fetch(url, { headers: this.authorization })
      .then((res) => {
        if (res.status !== 200) throw `Status: ${res.status}`;
        return res.json();
      })
      .then((json) => this.renderSlots(json))
      .catch((error) =>
        console.log(`Failed to render data ${url}:`, error)
      );
  }

  splitWords(dataWord) {
    let resWord = "";
    for (let i = 0; i < dataWord.length; i ++) {
      if (dataWord[i] === dataWord[i].toUpperCase() && dataWord[i] !== dataWord[i].toLowerCase()) {
        resWord += "-";
        resWord += dataWord[i].toLowerCase();
      } else {
        resWord += dataWord[i];
      }
    }
    return resWord;
  }

  renderSlots(json) {
    const entries = Object.entries(json);
    console.log(`entires:\n${entries}`);
    const toSlot = ([key, value]) => {
      // prep key from Model name to slot name
      console.log(`${key} : ${value}\n`);
      let htmlName = "";
      const splittableWords = ["startTime", "endTime", "startTemp", "endTemp"];
      if (key === "tripName") {
        htmlName = "trip-title-text";
      } else if (splittableWords.includes(key)) {
        //console.log("here");
        htmlName = this.splitWords(key);
      } else if (key === "tripDate") {
        const tripDate = new Date(value);
        const longDateFormatted = new Intl.DateTimeFormat('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }).format(tripDate);
        const dayName = new Intl.DateTimeFormat('en-US', { weekday: 'short' }).format(tripDate);
        const shortDateFormatted = `${dayName}, ${tripDate.getMonth()+1}/${tripDate.getDate()}/${tripDate.getFullYear()}`;
        return html`<time slot="trip-title-date">${shortDateFormatted}</time>
                    <time slot="date">${longDateFormatted}</time>`;
      } else {
        htmlName = key;
      }

      console.log(`htmlName : ${htmlName}`);

      if (key.includes("Time")) {
        return html`<time slot="${htmlName}">${value}</time>`;
      } else {
        return html`<slot slot="${htmlName}">${value}</slot>`;
      }
    }
    const fragment = entries.map(toSlot);
    console.log(`fragment: ${fragment}`);
    this.replaceChildren(...fragment);
  }
  
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