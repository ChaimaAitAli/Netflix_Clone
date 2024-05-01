const router = require("express").Router();
const Movie = require("../models/Movie");
const SavedItem = require("../models/SavedItems");

const verify = require("../verifyToken");


router.post("/add", verify, async (req, res) => {
  try {
    const { userId, movieId } = req.body;

    if (!userId || !movieId) {
      return res.status(400).json("Missing userId or movieId");
    }

    const newSavedItem = new SavedItem({
      userId,
      movieId,
    });

    const savedItem = await newSavedItem.save();

    res.status(201).json(savedItem);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

router.get("/check", verify, async (req, res) => {
  try {
    const userId = req.query.userId;
    const movieId = req.query.movieId;

    if (!userId || !movieId) {
      return res.status(400).json("Missing userId or movieId");
    }

    const savedItem = await SavedItem.findOne({ userId, movieId });

    res.status(200).json({ exists: savedItem !== null });
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});


//CREATE


router.get("/user/:userId", verify, async (req, res) => {
  try {
    const userId = req.params.userId;

    if (!userId) {
      return res.status(400).json("Missing userId");
    }

    const savedItems = await SavedItem.find({ userId });

    const movieIds = savedItems.map(item => item.movieId);

    res.status(200).json(movieIds);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});


router.post("/", verify, async (req, res) => {
  if (req.user.isAdmin) {
    const newMovie = new Movie(req.body);
    try {
      const savedMovie = await newMovie.save();
      res.status(201).json(savedMovie);
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(403).json("You are not allowed!");
  }
});

//UPDATE

router.put("/:id", verify, async (req, res) => {
  if (req.user.isAdmin) {
    try {
      const updatedMovie = await Movie.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );
      res.status(200).json(updatedMovie);
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(403).json("You are not allowed!");
  }
});

//DELETE

router.delete("/:id", verify, async (req, res) => {
  if (req.user.isAdmin) {
    try {
      await Movie.findByIdAndDelete(req.params.id);
      res.status(200).json("The movie has been deleted...");
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(403).json("You are not allowed!");
  }
});

//GET

router.get("/find/:id", verify, async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);
    res.status(200).json(movie);
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET RANDOM

router.get("/random", verify, async (req, res) => {
  const type = req.query.type;
  let movie;
  try {
    if (type === "series") {
      movie = await Movie.aggregate([
        { $match: { isSeries: true } },
        { $sample: { size: 1 } },
      ]);
    } else {
      movie = await Movie.aggregate([
        { $match: { isSeries: false } },
        { $sample: { size: 1 } },
      ]);
    }
    res.status(200).json(movie);
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET ALL

router.get("/", verify, async (req, res) => {
  if (req.user.isAdmin) {
    try {
      const movies = await Movie.find();
      res.status(200).json(movies.reverse());
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(403).json("You are not allowed!");
  }
});

module.exports = router;