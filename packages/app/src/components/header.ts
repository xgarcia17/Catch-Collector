import { LitElement, css, html } from "lit";
import { Events } from "@calpoly/mustang";

type Checkbox = HTMLInputElement & { checked: boolean };

export class HeaderElement extends LitElement {

    toggleLightView(ev: InputEvent) {
        const target = ev.target as Checkbox;
        const checked = target.checked;

        Events.relay(ev, "light-view", { checked });

        const body = document.body;
        if (checked) {
        body.classList.add("light-view");
        } else {
        body.classList.remove("light-view");
        }
    }

    render() {
        return html`
        <header>
            <div class="header-title">
                <a href="/"><h1>Catch Collector</h1></a>
                <h1><slot name="image">&nbsp|&nbsp</slot> <slot name="page-title"><em>page title</em></slot></h1>
            </div>
            <div class="header-contents">
                <label @change = ${this.toggleLightView}>
                    <input type="checkbox" autocomplete="off" />
                    <h2>&nbspLight View</h2>
                </label>
                <h2><span id="userid"></span></h2>
                <h2 class="when-signed-in">
                    <a id="signout"><h2>Log Out</h2></a>
                </h2>
                <h2 class="when-signed-out">
                    <a id="signin" href="/login"><h2>Log In</h2></a>
                </h2>
            </div>
        </header>
        `;
    }

    static styles = css`
        header {
            grid-column: start / end;
            color: var(--color-large-header);
            background-color: var(--color-large-header-background);
            padding: var(--padding-small);
            font-family: var(--font-family-display);
            display: flex;
            align-items: center;
            justify-content: space-between;
            margin-bottom: var(--margin-small);
            flex-basis: min-content;
            max-height: 60px;
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

        a {
            font-size: inherit;
            color: inherit;
            text-decoration: none;
        }
        a:hover {
            font-size: 1.05em;
        }
    `;
}