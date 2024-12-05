import { css, html, shadow, Form } from "@calpoly/mustang";
import reset from "./styles/reset.css.js";

export class FavoriteCatch extends HTMLElement {
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
    </template>
  `;

  static styles = css ``;
  
  constructor() {
    super();
    shadow(this)
      .template(FavoriteCatch.template)
      .styles(reset.styles, FavoriteCatch.styles);
  }
}