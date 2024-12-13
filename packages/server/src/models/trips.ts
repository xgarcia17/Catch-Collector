
export interface Trip {
    _id: string,
    userID: string,
    tripName: string,
    tripDate: Date,
    location: string,
    startTime: string,
    endTime: string,
    weather: Weather,
    startTemp: string,
    endTemp: string,
    catches: Array<string>
}

export type Weather =
    | "Sunny"
    | "Partly Cloudy"
    | "Overcast"
    | "Windy"
    | "Rainy"