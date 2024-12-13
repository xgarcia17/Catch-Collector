import { css, html, shadow, Form, define, Observer } from "@calpoly/mustang";
import reset from "./styles/reset.css.js";

export class TripsForm extends HTMLElement {
  get src() {
    return this.getAttribute("src");
  }

  static uses = define({
    "mu-form": Form.Element
  });

  _authObserver = new Observer(this, "catch-collector:auth");

  connectedCallback() {
    this._authObserver.observe(({ user }) => {
      this._userid = user.username;
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

  get form() {
    return this.shadowRoot.querySelector("mu-form.catch-form");
  }
  
  submit(json) {
    console.log("clicked submit\n");
    console.log("Form data:", json);
    console.log(`this.userid = ${this._userid}`);

    const url = window.location.origin + "/api/trips";
    console.log(`url = ${url}`);

    if (!this.validateForm(json)) {
      const msg = "Not all required fields filled out. Please fill out all required fields then submit again.";
      console.log(msg);
      alert(msg);
      return;
    }

    json = this.processForm(json);

    console.log("Updated form data:", json);

    fetch(url, 
      { 
        headers: {
          'Content-Type': 'application/json'
        },
        method: "POST",
        body: JSON.stringify(json)  
      })
      .then((res) => {
        if (res.status !== 200) throw `Status: ${res.status}`;
        return res.json();
      })
      .catch((error) =>
        console.log(`Failed to render data ${url}:`, error)
      );
  }

  validateForm(json) {
    const requiredFields = ["tripName", "tripDate", "location"];
    for (const field of requiredFields) {
      if (!json[field] || field.trim() === "") {
        console.error(`Field "${field}" is missing but is required.`);
        return false;
      }
    }
    return true;
  }

  processForm(json) {
    const otherTripValues = [
      "startTime",
      "endTime",
      "weather",
      "startTemp",
      "endTemp",
    ]
    for (let i = 0; i < otherTripValues.length; i ++) {
      // nullify missing values
      let field = otherTripValues[i];
      if (!json[field]) {
        json[field] = null;
      }
      // process weather input
      if (field === "weather" && json["weather"] === "weather-title") {
        json["weather"] = null;
      }
    }
    json["tripDate"] = new Date(json["tripDate"]);
    // add catches to the json
    json["catches"] = [];
    // add userid to the json
    json["userID"] = this._userid;

    return json;
  }

  static template = html`
    <template>
      <div class="new-trip-form-container">
        <!--<div class="new-trip-form">-->
          <mu-form class="catch-form">
            <label><h3 class="new-trip-form-title">Log a New Trip</h3></label>
            <label>
              <span><h4>Trip Name*</h4></span>
              <input name="tripName" />
            </label>
            <label>
              <span><h4>Date*</h4></span>
              <input type="date" name="tripDate" />
            </label>
            <label>
              <span><h4>Location*</h4></span>
              <input name="location" />
            </label>
            <label>
              <span><h4>Start Time</h4></span>
              <input type="time" name="startTime" />
            </label>
            <label>
              <span><h4>End Time</h4></span>
              <input type="time" name="endTime" />
            </label>
            <label>
              <span><h4>Weather</h4></span>
              <select name="weather">
                <option value="weather-title">--Select the weather--</option>
                <option value="sunny">Sunny</option>
                <option value="partly-cloudy">Partly Cloudy</option>
                <option value="overcast">Overcast</option>
                <option value="rainy">Rainy</option>
                <option value="windy">Windy</option>
              </select>
            <label>
              <span><h4>Start Temperature(F)</h4></span>
              <input type="number" name="startTemp" />
            </label>
            <label>
              <span><h4>End Temperature(F)</h4></span>
              <input type="number" name="endTemp" />
            </label>
          </mu-form>
        <!--</div>-->
      </div>
    </template>
  `;

  static styles = css `
     .new-trip-form-title {
        text-align: center;
    }
    .new-trip-form-container {
        padding: var(--margin-tiny); 
        background-color: var(--color-large-header-background); 
        border-radius: 8px; 
        max-width: 400px; 
        margin: auto; 
        margin-top: -1 * var(--margin-small);

        h3, h4, span {
        color: var(--color-large-header);
        }
    }
    .catch-form {
      display: flex;
      width: auto;
      justify-content: center;
      align-items: center;
      padding: -1 * var(--margin-small);
    }
    label {
      width: auto;
      margin: -1 * var(--margin-small);
    }
  `;

  constructor() {
    super();
    shadow(this)
      .template(TripsForm.template)
      .styles(TripsForm.styles, reset.styles);
    
    this.addEventListener("mu-form:submit", (event) => {
      this.submit(event.detail);
      event.preventDefault();
    });
  }

}