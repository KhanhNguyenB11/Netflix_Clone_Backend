const router = require("express").Router({ mergeParams: true });
const List = require("../models/List");
const verify = require("../verifyToken");
router.post("/", async (req, res) => {
  const newList = new List({
    ...req.body,
    userId: req.params.id,
  });
  try {
    if(newList.title === "History"){
      res.status(200).json("You can't create this list");
    }
    else{
      const savedList = await newList.save();
      res.status(200).json(savedList);
    }
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});
router.put("/:id", verify, async (req, res) => {
  try {
    const updatedList = await List.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedList);
  } catch (error) {
    res.status(500).json(error);
  }
});
//delete list
router.delete("/:id", verify, async (req, res) => {
  try {
    const list = await List.findById(req.params.id);
    if(list.name !== "History"){
      const deletedList = await List.findByIdAndDelete(req.params.id);
      res.status(200).json(deletedList);
    }
    else{
      res.status(200).json("You can't delete this list");
    }
  } catch (error) {
    res.status(500).json(error);
  }
});
router.get("/", verify, async (req, res) => {
  if (req.params.id) console.log(req.params.id);
  else console.log("undefined");
  try {
    const list = await List.find({ userId: req.params.id });
    res.status(200).json(list);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.get("/:id", async (req, res) => {
  try {
  const list = await List.findById(req.params.id).populate('movies');
  res.status(200).json(list);
  console.log(list);
  }
  catch (error) {
    res.status(500).json(error);
    console.log(error);
  }
})

module.exports = router;
