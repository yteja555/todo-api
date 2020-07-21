const mongoose = require("mongoose");
const Joi = require("joi");

// mongoose schema for todo
const TodoSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    minlength: 3,
    trim: true,
  },
  description: {
    type: String,
    minlength: 3,
    trim: true,
  },
  status: {
    type: Boolean,
    default: false,
  },
  createdDate: {
    type: Date,
    default: Date.now,
  },
  completedDate: {
    type: Date,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
  },
});

// creating todo model
const ToDo = mongoose.model("todos", TodoSchema);

// joi validator for todo
function validateTodo(todo) {
  const todoSchema = {
    title: Joi.string().required().min(3).max(100),
    description: Joi.string().min(3).max(200),
    status: Joi.boolean(),
  };
  return Joi.validate(todo, todoSchema);
}

exports.ToDo = ToDo;
exports.validateTodo = validateTodo;
