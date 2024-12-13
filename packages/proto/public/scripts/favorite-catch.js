import { css, html, shadow, Form, Observer } from "@calpoly/mustang";
import reset from "./styles/reset.css.js";

export class FavoriteCatch extends HTMLElement {
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
    console.log("fetching url in favorite-catch.js!");
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
        <h3 class="table-title"><slot name="title">My Favorite Catch</slot></h3>
        <div class="table-container-centered">
          <table border="1">
            <tr>
              <th>Date</th>
              <th>Location</th>
              <th>Species</th>
              <th>Gear</th>
              <th>Rig</th>
            </tr>
            <tr>
              <td><time name="date"><em>date</em></time></td>
              <td><slot name="location"><em>location</em></slot></td>
              <td><slot name="species"><em>species</em></slot></td>
              <td><slot name="gear"><em>gear</em></slot></td>
              <td><slot name="rig"><em>rig</em></slot></td>
            </tr>
          </table>
        </div>
        <div class="catch-description">
          <p><slot name="description"><em>description</em></slot></p>
        </div>
        <div class="favorite-form-container">
          <div class="favorite-form">
            <h3 class="favorite-form-title">Edit your favorite catch details</h3>
            <mu-form class="edit">
              <label>
                <span>Title</span>
                <input name="title" />
              </label>
              <label>
                <span>Date</span>
                <input name="date" />
              </label>
              <label>
                <span>Location</span>
                <input name="location" />
              </label>
              <label>
                <span>Species</span>
                <input name="species" />
              </label>
              <label>
                <span>Gear</span>
                <input name="gear" />
              </label>
              <label>
                <span>Rig</span>
                <input name="rig" />
              </label>
              <label>
                <span>Description</span>
                <input name="description" />
              </label>
              <button type="submit" class="submit-button">Save Favorite</button>
            </mu-form>
          </div>
        </div>
    </template>
  `;

  static styles = css `
    .favorite-form-title {
        text-align: center;
    }
    .favorite-form-container {
        padding: var(--margin-tiny); /* Add spacing inside the container */
        background-color: var(--color-large-header-background); /* Light gray background */
        border-radius: 8px; /* Rounded corners */
        max-width: 500px; /* Optional: constrain width for better appearance */
        margin: var(--margin-small) auto; /* Center the container horizontally and add vertical spacing */

        h3, span {
        color: var(--color-large-header);
        }
    }
    .favorite-form {
        display: flex;
        flex-direction: column; /* Stack children vertically */
        gap: 0.2em; /* Add space between form fields */
        max-width: 400px; /* Optional: limit the width of the form */
        margin: 0 auto; /* Optional: center the form horizontally */
        margin-bottom: var(--margin-tiny);
    }
    .favorite-form mu-form.edit {
        display: flex;
        flex-direction: column; /* Stack labels vertically */
        gap: 1em; /* Add space between labels */
    }
    .favorite-form label {
        display: flex;
        flex-direction: column; /* Stack label text and input vertically */
        gap: 0.5em; /* Add space between text and input */
    }
    .favorite-form input {
        padding: 0.5em; /* Add padding for a better look */
        border: 1px solid #ccc; /* Add border for inputs */
        border-radius: 4px; /* Rounded corners */
        font-size: 1em; /* Adjust font size */
        width: 100%; /* Make inputs full-width */
        box-sizing: border-box; /* Ensure padding doesn't affect width */
    }
  `;

  get form() {
    return this.shadowRoot.querySelector("mu-form.edit");
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
      .template(FavoriteCatch.template)
      .styles(reset.styles, FavoriteCatch.styles);
    
    this.addEventListener("mu-form:submit", (event) =>
      this.submit(this.src, event.detail)
    );
  }

}