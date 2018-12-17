const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateRegisterInput(data) {
  let errors = {};

  data.name = !isEmpty(data.name) ? data.name : "";
  data.surname = !isEmpty(data.surname) ? data.name : "";
  data.email = !isEmpty(data.email) ? data.email : "";
  data.username = !isEmpty(data.username) ? data.username : "";
  data.password = !isEmpty(data.password) ? data.password : "";
  data.password2 = !isEmpty(data.password2) ? data.password2 : "";

  if (Validator.isEmpty(data.name)) {
    errors.name = "Name field is required";
  } else if (!Validator.isLength(data.name, { min: 2, max: 30 })) {
    errors.name = "Name must be between 2 and 30 characters";
  }

  if (Validator.isEmpty(data.surname)) {
    errors.surname = "Surname field is required";
  } else if (!Validator.isLength(data.surname, { min: 2, max: 30 })) {
    errors.surname = "Surname must be between 2 and 30 characters";
  }

  if (Validator.isEmpty(data.email)) {
    errors.email = "Email field is required";
  } else if (!Validator.isEmail(data.email)) {
    errors.email = "Email is invalid";
  }

  if (Validator.isEmpty(data.password)) {
    errors.password = "Password field is required";
  } else if (!Validator.isLength(data.password, { min: 6, max: 30 })) {
    errors.password = "Password must be between 6 and 30 characters";
  }

  if (Validator.isEmpty(data.password2)) {
    errors.password2 = "Confirm Password field is required";
  } else if (!Validator.isLength(data.password, { min: 6, max: 30 })) {
    errors.password = "Confirm Password must be between 6 and 30 characters";
  }

  if (!Validator.equals(data.password, data.password2)) {
    errors.matchPassword = "Passwords must match";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
