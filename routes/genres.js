const router = require("express").Router();
const Genre = require("../models/Genre");
const verify = require("../verifyToken");
router.post("/", verify, async (req, res) => {
    if (req.user.isAdmin) {
      const newGenre = new Genre(req.body);
      try {
        const savedGenre = await newGenre.save();
        res.status(200).json(savedGenre);
      } catch (error) {
        res.status(500).json(error);
        console.log(error);
      }
    }
  });

  router.put("/:id", verify, async (req, res) => {
    if (req.user.isAdmin) {
      try {
        const updatedGenre = await Genre.findByIdAndUpdate(
          req.params.id,
          {
            $set: req.body,
          },
          { new: true }
        );
        res.status(200).json(updatedGenre);
      } catch (error) {
        res.status(500).json(error);
      }
    }
  });
  router.delete("/:id", verify, async (req, res) => {
    if (req.user.isAdmin) {
      try {
        const deletedGenre = await Genre.findByIdAndDelete(req.params.id);
        res.status(200).json(deletedGenre);
      } catch (error) {
        res.status(500).json(error);
      }
    }
  });
  router.get("/:id", verify, async (req, res) => {
    try {
      const genre = await Genre.findById(req.params.id);
      res.status(200).json(genre);
    } catch (error) {
      res.status(500).json(error);
    }
  });
  router.get("/", verify, async (req, res) => {
    try {
      const genre = await Genre.find();
      res.status(200).json(genre);
    } catch (error) {
      res.status(500).json(error);
    }
  });
  router.post("/find",async(req,res)=>{
    try {
      console.log(req.body);
      const genre = await Genre.find({id: {$in: req.body} });
      console.log(genre);
      res.status(200).json(genre);
    } catch (error) {
      res.status(500).json(error);
    }
  })

  
  module.exports = router;