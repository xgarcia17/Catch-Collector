import { Trip } from "../models/trips"


const trips: Trip[] = [
    {
        tripName: "[SERVICE] Laguna Lake",
        tripDate: new Date("2024-9-16"),
        location: "Laguna Lake, San Luis Obispo, CA",
        startTime: "8:15 AM",
        endTime: "11:26 PM",
        weather: ["Sunny"],
        startTemp: "56°F",
        endTemp: "72°F",
        catches: [
            "2 Largemouth Bass",
            "1 Bluegill"
        ]
    },
    {
        tripName: "Morro Strand State Beach",
        tripDate: new Date("2024-10-13"),
        location: "Morro Strand State Beach, Morro Bay, CA",
        startTime: "11:17 AM",
        endTime: "1:54 PM",
        weather: ["Overcast", "Windy"],
        startTemp: "53°F",
        endTemp: "65°F",
        catches: ["3 Surfperch"]
    },
    {
        tripName: "Halloween at Morro Bay",
        tripDate: new Date("2024-10-31"),
        location: "Morro Strand State Beach, Morro Bay, CA",
        startTime: "8:00 AM",
        endTime: "11:34 AM",
        weather: ["Overcast"],
        startTemp: "48°F",
        endTemp: "56°F",
        catches: ["1 Smelt", "2 Surfperch"]
    }
];

export function getTrips(): Trip[] {
    return trips;
}