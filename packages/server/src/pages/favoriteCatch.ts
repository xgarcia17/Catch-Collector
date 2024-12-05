import { css, html } from "@calpoly/mustang/server";
import { FavoriteCatch } from "../models";
import renderPage from "./renderPage";

export class FavoriteCatchPage {
  data: FavoriteCatch;

  constructor(data: FavoriteCatch) {
    this.data = data;
  }

  render() {
    return renderPage({
      body: this.renderBody(),
    });
  }

  renderBody() {
    const { 
      userID,
      title,
      date,
      location,
      species,
      gear,
      rig,
      description,
    } = this.data;

    const strDate = `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;

    return html`
    <body class="page">
        <mu-auth provides="catch-collector:auth">
            <custom-header>
                <slot slot="page-title">Favorite Catch</slot>
            </custom-header>
            <!--<favorite-catch class="table-container" src="/api/favorites/${userID}"></favorite-catch>-->
            <div class="table-container">
                <h3 class="table-title"><slot name="title">${title}</slot></h3>
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
                        <td><time name="date">${strDate}</time></td>
                        <td><slot name="location">${location}</slot></td>
                        <td><slot name="species">${species}</slot></td>
                        <td><slot name="gear">${gear}</slot></td>
                        <td><slot name="rig">${rig}</slot></td>
                        </tr>
                    </table>
                </div>
                <div class="catch-description">
                    <p><slot name="description">${description}</p>
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
            </div>
        </mu-auth>
    </body>
    `;
  }
}