import { Schema, model } from "mongoose";
import { Trip } from "../models/trips"

// Mongo Schema for Trip
const TripSchema = new Schema<Trip>(
    {
        userID: { type: String, required: true, trim: true },
        tripName: { type: String, required: true },
        tripDate: { type: Date, required: true },
        location: { type: String, required: true },
        startTime: { type: String, required: true },
        endTime: { type: String, required: true },
        weather: [{ type: String, required: true }],
        startTemp: { type: String, required: true },
        endTemp: { type: String, required: true },
        catches: [{ type: String, required: true }],
    },
    { collection: "trips" }
);

const TripModel = model<Trip>("Trip", TripSchema);

// const trips: Trip[] = [
//     {
//         _id: "1",
//         userID: "1",
//         tripName: "[SERVICE] Laguna Lake",
//         tripDate: new Date("2024-9-16"),
//         location: "Laguna Lake, San Luis Obispo, CA",
//         startTime: "8:15 AM",
//         endTime: "11:26 PM",
//         weather: ["Sunny"],
//         startTemp: "56°F",
//         endTemp: "72°F",
//         catches: [
//             "2 Largemouth Bass",
//             "1 Bluegill"
//         ]
//     },
//     {
//         _id: "2",
//         userID: "1",
//         tripName: "Morro Strand State Beach",
//         tripDate: new Date("2024-10-13"),
//         location: "Morro Strand State Beach, Morro Bay, CA",
//         startTime: "11:17 AM",
//         endTime: "1:54 PM",
//         weather: ["Overcast", "Windy"],
//         startTemp: "53°F",
//         endTemp: "65°F",
//         catches: ["3 Surfperch"]
//     },
//     {
//         _id: "3",
//         userID: "1",
//         tripName: "Halloween at Morro Bay",
//         tripDate: new Date("2024-10-31"),
//         location: "Morro Strand State Beach, Morro Bay, CA",
//         startTime: "8:00 AM",
//         endTime: "11:34 AM",
//         weather: ["Overcast"],
//         startTemp: "48°F",
//         endTemp: "56°F",
//         catches: ["1 Smelt", "2 Surfperch"]
//     }
// ];

// default function for development -> all trips for user = 1
function getTrips(): Promise<Trip[]> {
    return TripModel.find({ userID : "1" })
        .then((list) => list)
        .catch((err) => {
        throw `tripID: 1 Not Found`;
        });;
}

function index(): Promise<Trip[]> {
    return TripModel.find();
}
  
function getTripsByUserID(userID: String): Promise<Trip[]> {
    return TripModel.find({ userID : userID })
        .then((list) => list)
        .catch((err) => {
        throw `tripID: ${userID} Not Found`;
        });
}
  
export default { index, getTripsByUserID, getTrips };