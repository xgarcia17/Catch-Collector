import { css, html, shadow, Form } from "@calpoly/mustang";
import reset from "./styles/reset.css.js";

export class FavoriteCatch extends HTMLElement {

  // get src() {
  //   return this.getAttribute("src");
  // }

  // connectedCallback() {
  //   if (this.src) this.hydrate(this.src);
  // }

  // _authObserver = new Observer(this, "catch-collector:auth");

  // connectedCallback() {
  //   this._authObserver.observe(({ user }) => {
  //     this._user = user;
  //   });
  // }

  // get form() {
  //   return this.shadowRoot.querySelector("mu-form.edit");
  // }

  // hydrate(url) {
  //   fetch(url, { headers: this.authorization })
  //     .then((res) => {
  //       if (res.status !== 200) throw `Status: ${res.status}`;
  //       return res.json();
  //     })
  //     .then((json) => {
  //       this.renderSlots(json);
  //       this.form.init = json; // populate mu-form
  //     })
  //     .catch((error) =>
  //       console.log(`Failed to render data ${url}:`, error)
  //     );
  // }

  // renderSlots(json) {
  //   const entries = Object.entries(json);
  //   const toSlot = ([key, value]) => {
  //     if (key === "date") return html`<time slot="${key}">${value}</time>`
  //     else return html`<span slot="${key}">${value}</span>`
  //   }
  //   const fragment = entries.map(toSlot);
  //   this.replaceChildren(...fragment);
  // }

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
              <td><time name="date">10/13/24</time></td>
              <td><slot name="location">Morro Strand State Beach</slot></td>
              <td><slot name="species">Surfperch</slot></td>
              <td><slot name="gear">Uncle Ken's Spinning</slot></td>
              <td><slot name="rig">Carolina Rig: Gulp Sandworm 4"</slot></td>
            </tr>
          </table>
        </div>
        <div class="catch-description">
          <p><slot name="description">This catch was so epic because I saw a harbor seal pop right out of the water right in front of me!</slot></p>
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
            </mu-form>
          </div>
        </div>
    </template>
  `;

  static styles = css `
   
  `;
  
  constructor() {
    super();
    shadow(this)
      .template(FavoriteCatch.template)
      .styles(reset.styles, FavoriteCatch.styles);
  }

}