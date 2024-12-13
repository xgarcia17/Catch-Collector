import express, { Request, Response } from "express";
import { Trip } from "../models/trips";
import  Trips  from "../services/trips-svc";

const router = express.Router();

// get trip by tripID
router.get("", (req: Request, res: Response) => {
    // if no query, return all trips
    if (Object.keys(req.query).length === 0) {
        console.log("don't really want to allow view of all trips, but good for now");
        Trips.index()
            .then((list: Trip[]) => res.json(list))
            .catch((err) => res.status(500).send(err));
    } else {
        const { tripID } = req.query as { tripID?: string };
        if (tripID) {
            Trips.getTripByTripID(tripID)
                .then((trip: Trip) => res.json(trip))
                .catch((err) => res.status(404).send(err));
        } else {
            res.status(400).send("Missing required query parameter: tripID");
        }
    }
});
  
// get trips by userID
router.get("/:userID", (req: Request, res: Response) => {
    const { userID } = req.params;

    Trips.getTripsByUserID(userID)
        .then((trips: Trip[]) => res.json(trips))
        .catch((err) => res.status(404).send(err));
});

// get trips by tripID
router.get("/tripID=:tripID", (req: Request, res: Response) => {
    const { tripID } = req.params;

    Trips.getTripByTripID(tripID)
        .then((trip: Trip) => res.json(trip))
        .catch((err) => res.status(404).send(err));
});

// post new trip post
router.post("/", (req: Request, res: Response) => {
    const newTrip = req.body;
    console.log(`newTrip = ${JSON.stringify(newTrip, null, 2)}`);
        Trips.create(newTrip)
        .then((trip: Trip) =>
        res.status(201).json(trip)
        )
        .catch((err) => res.status(500).send(err));
});

// update an existing trip post
router.put("/:tripID", (req: Request, res: Response) => {
    const { tripID } = req.params;
    const newTrip = req.body;

    Trips
        .update(tripID, newTrip)
        .then((trip: Trip) => res.json(trip))
        .catch((err) => res.status(404).end());
});

// delete an existing trip post
router.delete("/:tripID", (req: Request, res: Response) => {
    const { tripID } = req.params;

    Trips.remove(tripID)
        .then(() => res.status(204).end())
        .catch((err) => res.status(404).send(err));
});


export default router;