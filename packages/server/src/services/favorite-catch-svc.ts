import { Schema, model } from "mongoose";
import { describe } from "node:test";
import { FavoriteCatch } from "../models";

const FavoriteCatchSchema = new Schema<FavoriteCatch>(
  {
    userID: { type: String, required: true, trim: true },
    title: { type: String, required: true, trim: true },
    date: { type: Date, trim: true },
    location: { type: String, trim: true },
    species: { type: String, trim: true },
    gear: { type: String, trim: true },
    rig: { type: String, trim: true },
    description: { type: String, trim: true },
  },
  { collection: "favorites" }
);

const FavoriteCatchModel = model<FavoriteCatch>("Favorites", FavoriteCatchSchema);


function index(): Promise<FavoriteCatch[]> {
  return FavoriteCatchModel.find();
}

function get(userID: String): Promise<FavoriteCatch> {
  return FavoriteCatchModel.find({ userID : userID })
    .then((list) => list[0])
    .catch((err) => {
      throw `${userID} Not Found`;
    });
}

export default { index, get };

// export function getFavoriteCatch(_: string) {
//   // return Venice regardless of which destination is requested
//   return favoriteCatch;
// }