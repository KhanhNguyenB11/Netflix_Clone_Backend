const router = require("express").Router({ mergeParams: true });
const verify = require("../verifyToken");
const History = require("../models/History");
router.patch("/updateHistory", async (req, res) => {
  const movieId = req.body.movie;
  const currentHistory = await History.findOne({ userId: req.params.id });

  const isMovieInHistory = currentHistory?.movies.some(
    (historyMovie) => String(historyMovie.movie) === movieId
  );
  if (isMovieInHistory) {
    res.status(200).json("Movie already in the history");
    return;
  } else {
    const movie = req.body;
    if (!currentHistory.movies) {
      currentHistory.movies = [];
    }
    currentHistory.movies.push(movie);
    try {
      const updatedHistory = await currentHistory.save();
      res.status(200).json(updatedHistory);
    } catch (error) {
      res.status(500).json(error);
    }
  }
});

router.patch("/:movieId", async (req, res) => {
  const playbackProgress = req.body.playbackProgress;
  console.log(req.body);
  try {
    const history = await History.findOneAndUpdate(
      {
        userId: req.params.id,
        "movies.movie": req.params.movieId,
      },
      {
        $set: {
          "movies.$.playbackProgress": playbackProgress,
        },
      },
      { new: true } // Return the modified document
    );
    res.status(200).json(history);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});
router.get("/:movieId", async (req, res) => {
  try {
    const history = await History.findOne({
      userId: req.params.id,
    });
    const movie = history.movies.find(
      (item) => item.movie == req.params.movieId
    );
    res.status(200).json(movie);
  } catch (error) {
    res.status(500).json(error);
  }
});
router.delete("/:movieId", async (req, res) => {
  const movie = req.params.movieId;
  const currentHistory = await History.findOne({ userId: req.params.id });
  currentHistory.movies.pull({ movie: movie._id });
  try {
    const updatedHistory = await currentHistory.save();
    res.status(200).json(updatedHistory);
  } catch (error) {
    res.status(500).json(error);
  }
});
router.get("/", async (req, res) => {
  try {
    const history = await History.findOne({ userId: req.params.id }).populate(
      "movies.movie"
    );
    res.status(200).json(history);
  } catch (error) {
    res.status(500).json(error);
  }
});
module.exports = router;
