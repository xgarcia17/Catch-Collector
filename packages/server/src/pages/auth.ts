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

            function toggleLightView(page, checked) {
                page.classList.toggle("light-view", checked);
            }

            document.body.addEventListener("light-view", (event) => 
                toggleLightView(event.currentTarget, event.detail.checked)
            );
          `
        ],
        stylesheets: [
            "/styles/reset.css",
            "/styles/tokens.css",
            "/styles/page.css",
            "/styles/trips.css"
        ],
        // styles: [
        //   css`
        //     /* your CSS here */
        //   `
        // ],
        body: html`
          <body>
            <mu-auth provides="catch-collector:auth">
              <article>
              <div class="header-title">
                    <a href="/index.html"><h1>Catch Collector</h1></a>
                    <h1>&nbsp&nbsp|&nbsp Login</h1>
                </div>
                <div class="header-contents">
                    <label onchange="relayEvent(event, 'light-view', {checked: event.target.checked})">
                        <input type="checkbox" autocomplete="off" />
                        <h2>&nbspLight View</h2>
                    </label>
                </div>
                <main class="page">
                  <login-form api="/auth/login">
                    <h3 slot="title">Sign in and go places!</h3>
                  </login-form>
                  <p class="register">
                    Or did you want to
                    <a href="./register">
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