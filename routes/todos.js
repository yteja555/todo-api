const express = require("express");
const auth = require("../middleware/auth");
const { ToDo, validateTodo } = require("../models/todo");
const { User } = require("../models/user");
const { route } = require("./users");
const router = express.Router();

// @desc get todos
// @route get / todos
router.get("/", auth, async (req, res) => {
  const todos = await ToDo.find({ user: req.userId });
  res.send(todos);
});

// @desc post todo
// @route post/todos
router.post("/", auth, async (req, res) => {
  try {
    const { error } = validateTodo(req.body);
    if (error)
      return res.status(400).send("bad request " + error.details[0].message);

    const todo = new ToDo({ ...req.body, user: req.userId });
    await todo.save();

    res.send(todo);
  } catch (err) {
    res.status(500).send("something went wrong");
  }
});

// @desc update todo
// @route put/todo/id
router.put("/:id", auth, async (req, res) => {
  try {
    let todo = await ToDo.findById(req.params.id).lean();
    if (!todo)
      return res.status(404).send("todo with id not found " + err.message);
    console.log("body is ", req.body);
    const newOne = await ToDo.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    console.log("updated todo is ", newOne);
    res.send(newOne);
  } catch (err) {
    res.status(500).send("something went wrong " + err.message);
  }
});

// @desc delete todo
// @route delete/todo/id
router.delete("/:id", auth, async (req, res) => {
  try {
    let todo = await ToDo.findById(req.params.id).lean();
    if (!todo) return res.status(404).send("todo with id not found ");
    todo = await ToDo.findByIdAndRemove(req.params.id);
    res.send(todo);
  } catch (err) {
    res.status(500).send("something went wrong " + err.message);
  }
});
module.exports = router;
