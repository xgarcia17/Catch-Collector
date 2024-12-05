import { css, html, shadow, Form, Observer } from "@calpoly/mustang";
import reset from "./styles/reset.css.js";

export class TripsForm extends HTMLElement {
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
    console.log("fetching url in trips-form.js!");
    fetch(url, { headers: this.authorization })
      .then((res) => {
        if (res.status !== 200) throw `Status: ${res.status}`;
        return res.json();
      })
      .then((json) => {
        this.renderSlots(json);
        // this.form.init = json; // populate mu-form
      })
      .catch((error) =>
        console.log(`Failed to render data ${url}:`, error)
      );
  }

  renderSlots(json) {
    const entries = Object.entries(json);
    const toSlot = ([key, value]) => {
      if (key === "date") {
        const strDate = `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
        return html`<time slot="${key}">${strDate}</time>`
      } else {
        return html`<slot slot="${key}">${value}</slot>`
      }
    }
    const fragment = entries.map(toSlot);
    this.replaceChildren(...fragment);
  }

  static template = html`
    <template>
      <div class="new-trip-form-container">
        <div class="new-trip-form">
          <mu-form class="edit">
            <h3 class="new-trip-form-title">Log a New Trip</h3>
            <label>
              <span><h4>Trip Name</h4></span>
              <input name="tripName" />
            </label>
            <label>
              <span><h4>Date</h4></span>
              <input name="tripDate" />
            </label>
            <label>
              <span><h4>Location</h4></span>
              <input name="location" />
            </label>
            <label>
              <span><h4>Start Time</h4></span>
              <input name="startTime" />
            </label>
            <label>
              <span><h4>End Time</h4></span>
              <input name="endTime" />
            </label>
            <label>
              <span><h4>Weather</h4></span>
              <input name="weather" />
            </label>
            <label>
              <span><h4>Start Temperature</h4></span>
              <input name="startTemp" />
            </label>
            <label>
              <span><h4>End Temperature</h4></span>
              <input name="endTemp" />
            </label>
            <label>
              <span><h4>Catches</h4></span>
              <input name="catches" />
            </label>
            <slot name="submit">
              <button type="submit">Log Trip</button>
            </slot>
          </mu-form>
        </div>
      </div>
    </template>
  `;

  static styles = css `
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
    .new-trip--form mu-form.edit {
        display: flex;
        flex-direction: column; /* Stack labels vertically */
        gap: 1em; /* Add space between labels */
    }
    .new-trip--form label {
        display: flex;
        flex-direction: column; /* Stack label text and input vertically */
        gap: 0.5em; /* Add space between text and input */
    }
    .new-trip--form input {
        padding: 0.5em; /* Add padding for a better look */
        border: 1px solid #ccc; /* Add border for inputs */
        border-radius: 4px; /* Rounded corners */
        font-size: 1em; /* Adjust font size */
        width: 100%; /* Make inputs full-width */
        box-sizing: border-box; /* Ensure padding doesn't affect width */
    }
  `;

  get form() {
    return this.shadowRoot.querySelector("mu-form.start");
  }
  
  get mode() {
    return this.getAttribute("mode");
  }
  
  set mode(m) {
    this.setAttribute("mode", m);
  }
  // submit(url, json) {
  //   fetch(url, … )
  //     .then((res) => {
  //       // check status first here
  //       return res.json();
  //     })
  //     .then((json) => {
  //       this.renderSlots(json);
  //       this.form.init = json;
  //     })
  //     .catch( … );
  // }

  constructor() {
    super();
    shadow(this)
      .template(TripsForm.template)
      .styles(reset.styles, TripsForm.styles);
    
    this.addEventListener("mu-form:submit", (event) =>
      this.submit(this.src, event.detail)
    );
  }

}