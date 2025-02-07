import validator from "validator";

export const signUpValidation = (req) => {
  const { username, emailId, password } = req.body;
  const errors = [];

  if (!username) {
    errors.push("Please enter a valid name");
  }
  if (!validator.isEmail(emailId)) {
    errors.push("Invalid email format");
  }
  if (!validator.isStrongPassword(password)) {
    errors.push("Please enter a strong password.");
  }
  if (errors.length > 0) {
    throw new Error(errors.join(" | "));
  }
  return true; // All validations passed
};
