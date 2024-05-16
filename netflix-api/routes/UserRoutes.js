import { addToLikedMovies, getLikedMovies, removeFromLikedMovies } from "../controllers/UserController";

const router = require("express").Router();

router.get("/liked/:email", getLikedMovies);
router.post("/add", addToLikedMovies);
router.put("/remove", removeFromLikedMovies);

export default router;