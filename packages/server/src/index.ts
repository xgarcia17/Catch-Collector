import express, { Request, Response } from "express";
import { TripsPage } from "./pages/trips";
import { getTrips } from "./services/trips-svc";

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
    const data = getTrips();
    const page = new TripsPage(data);
    res.set("Content-Type", "text/html").send(page.render());
  }
);