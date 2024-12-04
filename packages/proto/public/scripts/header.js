import { css, html, shadow, Events, Observer } from "@calpoly/mustang";
import reset from "./styles/reset.css.js";

export class HeaderElement extends HTMLElement {

    static template = html`
    <template>
        <header>
            <div class="header-title">
                <h1>Catch Collector &nbsp|&nbsp <slot name="page-title"><em>page title</em></slot></h1>
            </div>
            <div class="header-contents">
                <label onchange="relayEvent(event, 'light-view', {checked: event.target.checked})">
                    <input type="checkbox" autocomplete="off" />
                    <h2>&nbspLight View</h2>
                </label>
                <h2><slot name="userid"><em>username</em></slot></h2>
            </div>
        </header>
    </template>
    `;

    static styles = css`
        header {
            grid-column: start / end;
            margin-bottom: -1 * var(--margin-small);
            color: var(--color-large-header);
            background-color: var(--color-large-header-background);
            padding: var(--padding-small);
            font-family: var(--font-family-display);
            display: flex;
            align-items: center;
            justify-content: space-between;
            margin-bottom: var(--margin-small);
            flex-basis: min-content;
        }
        .header-title {
            margin-left: var(--margin-small);
            grid-column: 1 / 3;
            display: flex;
            align-items: center;
            color: var(--color-large-header);

            a:hover {
                font-size: 1.01em;
            }
        }
        .header-contents {
            margin-right: var(--margin-small);
            display: flex;
            align-items: right;
            justify-content: space-between;
            gap: var(--margin-small);
            color: var(--color-large-header);

            label {
                display: flex;
                align-items: center;

                h2 {
                    display: inline-block;
                    margin: 0;
                }
            }
        }
        header h2 {
            color: var(--color-large-header);
        }
    `;

    get userid() {
        return this._userid.textContent;
    }

    set userid(id) {
        if (id === "anonymous") {
            this._userid.textContent = "";
            this._signout.disabled = true;
        } else {
            this._userid.textContent = id;
            this._signout.disabled = false;
        }
    }

    constructor() {
        super();
        console.log("in header.js constructor");
        shadow(this)
            .template(HeaderElement.template)
            .styles(HeaderElement.styles, reset.styles);

        this._userid = this.shadowRoot.querySelector("#userid");

        this._signout = this.shadowRoot.querySelector("#signout");

        this._signout.addEventListener("click", (event) =>
            Events.relay(event, "auth:message", ["auth/signout"])
        );
    }

    _authObserver = new Observer(this, "catch-collector:auth");

    get authorization() {
        return (
            this._user?.authenticated && {
                Authorization: `Bearer ${this._user.token}`
            }
        );
    }

    connectedCallback() {
        this._authObserver.observe(({ user }) => {
            if (user && user.username !== this.userid) {
                this.userid = user.username;
            }
        });
    }

    static initializeOnce() {
        function toggleLightView(page, checked) {
            page.classList.toggle("light-view", checked);
        }
    
        document.body.addEventListener("light-view", (event) => 
            toggleLightView(event.currentTarget, event.detail.checked)
        );
    }
}