import { describe } from "node:test";
import { FavoriteCatch } from "../models";

const favoriteCatch = {
  title: "My Favorite Catch",
  date: new Date("2024-10-14"),
  location: "Avila Beach",
  species: "surfperch",
  gear: "spinning rod",
  rig: "Carolina rig",
  description: "I got my first surfperch!",
};

export function getFavoriteCatch(_: string) {
  // return Venice regardless of which destination is requested
  return favoriteCatch;
}