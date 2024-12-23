import express, { Request, Response } from "express";
import { connect } from "./services/mongo";
import { LoginPage } from "./pages/auth";
import { TripsPage } from "./pages/trips";
import { IndividualTripPage } from "./pages/individualTrip";
import { NewTripFormPage } from "./pages/newTrip";
import Trips from "./services/trips-svc";

// importing routes
import trips from "./routes/trips";
import auth, { authenticateUser } from "./routes/auth";

connect("catch-collector");
const app = express();
const port = process.env.PORT || 3000;
const staticDir = process.env.STATIC || "public";

app.use(express.static(staticDir));
app.use(express.json());

app.get("/hello", (req: Request, res: Response) => {
    res.send("Hello, World");
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

// mount auth API
app.use("/auth", auth);

// mount trips API
app.use("/api/trips", trips);

// get all trip posts by userID
app.get("/trips/:userID", (req: Request, res: Response) => {
    const { userID } = req.params;
    Trips.getTripsByUserID(userID).then((data) => {
      const page = new TripsPage(data);
      res
        .set("Content-Type", "text/html")
        .send(page.render());
    })
  }
);

// get trip by tripID
app.get("/trips", (req: Request, res: Response) => {
  if (Object.keys(req.query).length === 0) {
    console.log("rendering all trips because none provided in query");
    Trips.index()
        .then((data) => {
          const page = new TripsPage(data);
          res
            .set("Content-Type", "text/html")
            .send(page.render());
        });
  } else {
      const { tripID } = req.query as { tripID?: string };
      if (tripID) {
        console.log(`\nlaunching Individual Trip Page with tripID ${tripID}`);
        const page = new IndividualTripPage(tripID);
        res
          .set("Content-Type", "text/html")
          .send(page.render());
      } else {
          res.status(400).send("Missing required query parameter: userID");
      }
  }
});

// get new trip page
app.get("/new-trip/", (req: Request, res: Response) => {
  const page = new NewTripFormPage();
  res.set("Content-Type", "text/html").send(page.render());
});

// auth route for login page
app.get("/login", (req: Request, res: Response) => {
  const page = new LoginPage();
  res.set("Content-Type", "text/html").send(page.render());
});
