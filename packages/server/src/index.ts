import express, { Request, Response } from "express";
import { connect } from "./services/mongo";
import { TripsPage } from "./pages/trips";
import Trip from "./services/trips-svc";

connect("catch-collector");
const app = express();
const port = process.env.PORT || 3000;
const staticDir = process.env.STATIC || "public";

app.use(express.static(staticDir));

app.get("/hello", (req: Request, res: Response) => {
    res.send("Hello, World");
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

// route for trips page
app.get(
  "/trips",
  (req: Request, res: Response) => {
    Trip.getTrips().then((data) => {
      const page = new TripsPage(data);
      res
        .set("Content-Type", "text/html")
        .send(page.render());
    })
  }
);

app.get("/trips/:userid", (req: Request, res: Response) => {
  const { userid } = req.params;

  Trip.getTripsByUserID(userid).then((data) => {
    const page = new TripsPage(data);
    res
      .set("Content-Type", "text/html")
      .send(page.render());
  });
});