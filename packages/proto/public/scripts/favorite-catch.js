import { css, html, shadow, Form } from "@calpoly/mustang";
import reset from "./styles/reset.css.js";

export class FavoriteCatch extends HTMLElement {
  static template = html`
    <template>
        <h3 class="table-title">Your Favorite Catch</h3>
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
              <td>10/13/24</td>
              <td>Morro Strand State Beach</td>
              <td>Surfperch</td>
              <td>Uncle Ken's Spinning</td>
              <td>Carolina Rig: Gulp Sandworm 4"</td>
            </tr>
          </table>
        </div>
        <div class="catch-description">
          <p>
            This catch was so epic because I saw a harbor seal pop right out of the water right in front of me!
          </p>
        </div>
    </template>
  `;

  static styles = css ``;
  // static styles = css`
  //   .table-container {
  //       margin-top: var(--margin-small);
  //       margin-left: var(--margin-small);
  //       margin-right: var(--margin-small);
  //       margin-bottom: var(--margin-small);

  //       grid-column: 1 / 5;
        
  //       .table-container-centered {
  //           display: flex;
  //           justify-content: center;
  //           align-items: center;
  //       }
        
  //       th, td {
  //           color: var(--color-basic-text);
  //           padding: var(--padding-medium);
  //       }
  //   }
  //   .table-title {
  //       padding-bottom: var(--margin-tiny);
  //       text-align: center;
  //   }

  //   .catch-description {
  //       padding-top: var(--margin-small);
  //       display: flex;
  //       justify-content: center;
  //       align-items: center;
  //   }
  // `;

  constructor() {
    super();
    shadow(this)
      .template(FavoriteCatch.template)
      .styles(reset.styles, FavoriteCatch.styles);
  }
}