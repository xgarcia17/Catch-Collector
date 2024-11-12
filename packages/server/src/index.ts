import express, { Request, Response } from "express";
import { connect } from "./services/mongo";
import { TripsPage } from "./pages/trips";
import Trips from "./services/trips-svc";

import trips from "./routes/trips";

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


// mount trips API
app.use("/api/trips", trips);

// get all trip posts
app.get(
  "/trips",
  (req: Request, res: Response) => {
    Trips.index().then((data) => {
      const page = new TripsPage(data);
      res
        .set("Content-Type", "text/html")
        .send(page.render());
    })
  }
);

// get all trip by tripID
app.get("/trips/:tripid", (req: Request, res: Response) => {
  const { tripid } = req.params;

  Trips.getTripByTripID(tripid).then((data) => {
    const page = new TripsPage([data]);
    res
      .set("Content-Type", "text/html")
      .send(page.render());
  });
});
