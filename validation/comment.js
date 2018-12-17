const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateCommentInput(data) {
  let errors = {};
  data.text = !isEmpty(data.text) ? data.text : "";

  if (Validator.isEmpty(data.text)) {
    console.log("aki");
    errors.text = "Comment text field is required";
  } else if (!Validator.isLength(data.text, { min: 10 })) {
    errors.text = "Comment text must have at least 10 characters";
  }
  return {
    errors,
    isValid: isEmpty(errors)
  };
};
