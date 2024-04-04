const express = require("express");
const authenticate = require("../middleware/auth.js");
const noteModal = require("../Schema/NotesSchema/noteSchema.js");

const router = express.Router();
// GET search for notes based on keywords for the authenticated user
router.get("/", authenticate, async (req, res) => {
  const query = req.query.q;
  const notes = await noteModal.find({
    $or: [
      { title: { $regex: query, $options: "i" } },
      { content: { $regex: query, $options: "i" } },
    ],
  });
  res.json(notes);
});

module.exports = router;
