import joi from "joi";

export const signUpSchema = joi.object({
  name: joi.string().min(1).required(),
  email: joi.string().email().required(),
  password: joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")),
});

export const signInSchema = joi.object({
  email: joi.string().email().required(),
  password: joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")),
});
