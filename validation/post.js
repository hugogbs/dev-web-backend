const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validatePostInput(data) {
  let errors = {};
  data.title = !isEmpty(data.title) ? data.title : "";
  data.text = !isEmpty(data.text) ? data.text : "";

  if (Validator.isEmpty(data.title)) {
    errors.title = "Post title field is required";
  }

  if (Validator.isEmpty(data.text)) {
    errors.text = "Post text field is required";
  } else if (!Validator.isLength(data.text, { min: 10 })) {
    errors.text = "Post text must have at least 10 characters";
  }
  return {
    errors,
    isValid: isEmpty(errors)
  };
};
