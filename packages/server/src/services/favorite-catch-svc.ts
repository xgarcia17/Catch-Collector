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

// post new trip post
function create(favor: FavoriteCatch, userID: string): Promise<FavoriteCatch> {
  return FavoriteCatchModel.findOneAndUpdate(
    { userID },  // Find the document with the given userID
    { $set: favor },  // Update the fields with the new data
    {
      new: true,  // Return the updated document (not the old one)
      upsert: true,  // If no document is found, insert a new one
    }
  )
  .then((result) => {
    if (!result) {
      throw new Error(`${userID} not updated or inserted`);
    }
    return result as FavoriteCatch;  // Return the updated or inserted document
  })
  .catch((err) => {
    throw new Error(err);  // Handle any errors that may occur
  });
}

// delete existing trip post
function remove(userID: String): Promise<void> {
  return FavoriteCatchModel.findOneAndDelete({ userID : userID }).then(
      (deleted) => {
      if (!deleted) throw `favorite for user ${userID} not deleted`;
      }
  );
}

export default { index, get, create, remove };