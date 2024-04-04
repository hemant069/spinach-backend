const express = require("express");
const authenticate = require("../middleware/auth.js");
const noteModal = require("../Schema/NotesSchema/noteSchema.js");

const router = express.Router();

//  get a list of all notes for the authenticated user.
router.get("/", authenticate, async (req, res) => {
  const notes = await noteModal.find({ userId: req.query.userId });
  res.json(notes);
});

// GET a note by ID for the authenticated user
router.get("/:id", authenticate, async (req, res) => {
  const note = await noteModal.findById(req.params.id);
  res.json(note);
});

// POST create a new note for the authenticated user
router.post("/", authenticate, async (req, res) => {
  const { title, content } = req.body;
  const note = new noteModal({ title, content });
  await note.save();
  res.json(note);
});

// PUT update an existing note by ID for the authenticated user
router.put("/:id", authenticate, async (req, res) => {
  const { title, content } = req.body;
  const note = await noteModal.findByIdAndUpdate(
    req.params.id,
    { title, content },
    { new: true }
  );
  res.json(note);
});

// DELETE a note by ID for the authenticated user
router.delete("/:id", authenticate, async (req, res) => {
  await noteModal.findByIdAndDelete(req.params.id);
  res.sendStatus(204);
});

// POST share a note with another user for the authenticated user
router.post("/:id/share", authenticate, async (req, res) => {
  const { sharedWith } = req.body;
  const note = await noteModal.findByIdAndUpdate(
    req.params.id,
    { $addToSet: { sharedWith } },
    { new: true }
  );
  res.json(note);
});

module.exports = router;
