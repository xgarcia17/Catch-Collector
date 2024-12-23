import { Schema, model } from "mongoose";
import { Trip } from "../models/trips"

// Mongo Schema for Trip
const TripSchema = new Schema<Trip>(
    {
        userID: { type: String, required: true, trim: true },
        tripName: { type: String, required: true },
        tripDate: { type: Date, required: true },
        location: { type: String, required: true },
        startTime: { type: String, required: false },
        endTime: { type: String, required: false },
        weather: { type: String, required: false },
        startTemp: { type: String, required: false },
        endTemp: { type: String, required: false },
        catches: [{ type: String, required: false }],
    },
    { collection: "trips" }
);

const TripModel = model<Trip>("Trips", TripSchema);

function index(): Promise<Trip[]> {
    return TripModel.find()
        .then((list) => list)
        .catch((err) => {
            throw `trip collection Not Found`
        });
}
  
function getTripsByUserID(userID: String): Promise<Trip[]> {
    return TripModel.find({ userID : userID })
        .then((list) => list)
        .catch((err) => {
            throw `tripID: ${userID} Not Found`;
        });
}

function getTripByTripID(tripID: String): Promise<Trip> {
    return TripModel.find({ _id : tripID })
        .then((list) => list[0])
        .catch((err) => {
            throw `tripID: ${tripID} Not Found`;
        });
}

// post new trip post
function create(json: Trip): Promise<Trip> {
    const trip = new TripModel(json);
    return trip.save();
}

// update an existing trip post
function update(
    tripID: String,
    trip: Trip
    ): Promise<Trip> {
    return TripModel.findOneAndUpdate({ _id : tripID }, trip, {
        new: true
    }).then((updated) => {
        if (!updated) throw `${tripID} not updated`;
        else return updated as Trip;
    });
}

// delete existing trip post
function remove(tripID: String): Promise<void> {
    return TripModel.findOneAndDelete({ _id : tripID }).then(
        (deleted) => {
        if (!deleted) throw `${tripID} not deleted`;
        }
    );
}
  
export default { index, getTripByTripID, getTripsByUserID, create, update, remove };