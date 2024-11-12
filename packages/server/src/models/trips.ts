
export interface Trip {
    _id: string,
    userID: string,
    tripName: string,
    tripDate: Date,
    location: string,
    startTime: string,
    endTime: string,
    weather: Array<Weather>,
    startTemp: string,
    endTemp: string,
    catches: Array<string>
}

export type Weather =
    | "Sunny"
    | "Cloudy"
    | "Overcast"
    | "Foggy"
    | "Windy"
    | "Rainy"
    | "Stormy"
    | "Snowy"
