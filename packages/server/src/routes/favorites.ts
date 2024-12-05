import express, { Request, Response } from "express";
import { FavoriteCatch } from "models";
import Favorites from "../services/favorite-catch-svc";

const router = express.Router();

// get favorite by userID
router.get("/:userID", (req: Request, res: Response) => {
    const { userID } = req.params;

    Favorites.get(userID)
        .then((fav: FavoriteCatch) => res.json(fav))
        .catch((err) => res.status(404).send(err));
});

// post new favorite for a user (also used to update existing favorite)
router.post("/", (req: Request, res: Response) => {
    const { newFav, userID } = req.body;

    Favorites.create(newFav, userID)
        .then((fav: FavoriteCatch) =>
        res.status(201).json(fav)
        )
        .catch((err) => res.status(500).send(err));
});

// delete an existing trip post
router.delete("/:userID", (req: Request, res: Response) => {
    const { userID } = req.params;

    Favorites.remove(userID)
        .then(() => res.status(204).end())
        .catch((err) => res.status(404).send(err));
});

export default router;