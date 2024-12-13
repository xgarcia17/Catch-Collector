import { Auth, Observer } from "@calpoly/mustang";
import { html, LitElement } from "lit";
import { state } from "lit/decorators.js";
import { Trip } from "server/models";

export class TripsViewElement extends LitElement {
  
    @state()
    tripIndex = new Array<Trip>();

    _authObserver = new Observer<Auth.Model>(
      this,
      "catch-collector:auth"
    );
  
    _user = new Auth.User();

    src = `/api/trips/`;
  
    connectedCallback() {
      super.connectedCallback();
      this._authObserver.observe(({ user }) => {
        if (user) {
          this._user = user;
        }
        this.hydrate(this.src);
      });
    }

    hydrate(url: string) {
      fetch(url, {
        headers: Auth.headers(this._user)
      })
        .then((res: Response) => {
          if (res.status === 200) return res.json();
          throw `Server responded with status ${res.status}`;
        })
        .then((json: unknown) => {
          if (json) {
            const { data } = json as { data: Array<Trip> };
            this.tripIndex = data;
          }
        })
        .catch((err) =>
          console.log("Failed to tour data:", err)
        );
    }

    render() {
      const renderItem = (tempTrip: Trip) => {
        const {
          tripName,
          tripDate,
          location,
          startTime,
          endTime,
          weather,
          startTemp,
          endTemp,
          catches
        } = tempTrip;

        // format dates
        const longDateFormatted = new Intl.DateTimeFormat('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }).format(tripDate);
        const dayName = new Intl.DateTimeFormat('en-US', { weekday: 'short' }).format(tripDate);
        const shortDateFormatted = `${dayName}, ${tripDate.getMonth()+1}/${tripDate.getDate()}/${tripDate.getFullYear()}`;

        // format catches
        let catchesStr: string = "";
        for (let i: number = 0; i < catches.length; i ++) {
            catchesStr += catches[i] + ", ";
        }
        catchesStr.slice(0, -2);
  
        return html`
          <trip-details class="trip-section-block">
              <slot slot="trip-title-text">${tripName}</slot>
              <time slot="trip-title-date">${shortDateFormatted}</time>
              <slot slot="location">${location}</slot>
              <time slot="date">${longDateFormatted}</time>
              <time slot="start-time">${startTime}</time>
              <time slot="end-time">${endTime}</time>
              <slot slot="weather">${weather}</slot>
              <slot slot="start-temp">${startTemp}</slot>
              <slot slot="end-temp">${endTemp}</slot>
              <slot slot="catches">${catchesStr}</slot>
          </trip-details>
        `;
      };

      const tripsList = this.tripIndex.map(renderItem);
  
      return html`
        <body class="page">
            <mu-auth provides="catch-collector:auth">
                <custom-header>
                    <slot slot="page-title">Your Trips</slot>
                </custom-header>
                ${tripsList}
            </mu-auth>
        </body>
      `;
    }
  }