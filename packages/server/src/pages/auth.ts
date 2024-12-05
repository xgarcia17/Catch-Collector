import { css, html } from "@calpoly/mustang/server";
import renderPage from "./renderPage";


export class LoginPage {
    render() {
      return renderPage({
        scripts: [
          `
          import { define, Auth } from "@calpoly/mustang";
          import { LoginForm } from "/scripts/login-form.js";
          import { Events } from "@calpoly/mustang";
  
          define({
            "mu-auth": Auth.Provider,
            "login-form": LoginForm
          })

            window.relayEvent = Events.relay;

            // function toggleLightView(page, checked) {
            //     page.classList.toggle("light-view", checked);
            // }

            // document.body.addEventListener("light-view", (event) => 
            //     toggleLightView(event.currentTarget, event.detail.checked)
            // );
          `
        ],
        // stylesheets: [
        //     "/styles/reset.css",
        //     "/styles/tokens.css",
        //     "/styles/page.css",
        //     "/styles/trips.css"
        // ],
        styles: [
          css`
            body {
                display: grid;
                grid-template-columns: [start] 1fr 1fr 1fr 1fr [end];
                background-color: #00065d;
                font-family: "New Tegomin", serif;
                margin-bottom: 2em;
                grid-column: 2 / 4;
                justify-self: center;
                align-self: center;
                width: 100%;
                line-height: 1.5;
            }

            .main-page-list {
                margin-top: 1em;
                margin-left: 2em;
                list-style-type: none;
            }

            .section-title {
                margin-left: 2em;
            }

            h1, h2, h3, h4, h5, p {
                color: #92d4ff;
            }
            a {
                color: #92d4ff;
                text-decoration: none;
            }
            a:hover {
                text-decoration: inherit;
            }
            * {
              margin: 0;
              box-sizing: border-box;
            }
            img {
              max-width: 100%;
            }
            .page {
                display: grid;
                grid-template-columns: [start] 1fr 1fr 1fr 1fr [end];
                grid-row-gap: 2em;
                justify-items: center;
            }
            article {
              display: grid;
              grid-template-columns: [start] 1fr 1fr 1fr 1fr [end];
            }
            .main-text {
              grid-columns: 2 / 4;
              justify-content: center;
              display: felx;
            }
          `
        ],
        body: html`
          <body>
            <mu-auth provides="catch-collector:auth">
              <div class="main-text">
                  <h1>Catch Collector</h1>
                  <h2>Login</h2>
              </div>
              <article>
                <main class="page">
                  <login-form api="/auth/login">
                    <h3 slot="title">Sign in and go places!</h3>
                  </login-form>
                  <p class="register">
                    Or did you want to
                    <a href="/register">
                      register as a new user
                    </a>
                    ?
                  </p>
                </main>
              </article>
            </mu-auth>
          </body>
        `
      });
    }
  }