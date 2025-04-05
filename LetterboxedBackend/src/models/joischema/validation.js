import joi, { required } from "joi";

const joiUserSchema = joi.object({
  userName: joi.string().required(),
  email: joi.string().email().required(),
  password: joi
    .string()
    .pattern(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
    )
    .required()
    .messages({
      "string.pattern.base":
        "Password must have at least one capital letter, one number, and be at least 8 characters long.",
    }),
  isSixteen: joi.boolean().required().valid(true).messages({
    "any.required": "You must accept terms and use.",
    "any.only": "You must accept terms and use.",
    "boolean.base": "The value must be a boolean.",
  }),
  isPAP: joi.boolean().required().valid(true).messages({
    "any.required": "You must accept privacy and policy.",
    "any.only": "You must accept privacy and policy.",
    "boolean.base": "The value must be a boolean.",
  }),
});

const joiUserLogin = joi.object({
  userName: joi.string().required(),
  password: joi.string().required(),
});
const joiNewPassword = joi.object({
  password: joi
    .string()
    .pattern(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
    )
    .required()
    .messages({
      "string.pattern.base":
        "Password must have at least one capital letter, one number, and be at least 8 characters long.",
    }),
  confirmPassword: joi
    .string()
    .valid(joi.ref("password"))
    .required()
    .messages({ "any.only": "Confirm password must match password" }),
});


const joiMovieScema = joi.object({
  title: joi.string().required(),
  releaseYear: joi.number().required(),
  genre: joi.string().trim().required(),
  director: joi.string().required(),
  cast: joi.string().trim().required(),
  smallPoster: joi.string().required(),
  bigPoster: joi.string().required(),
  description: joi.string().required(),
})
export { joiUserLogin, joiUserSchema, joiNewPassword,joiMovieScema };
