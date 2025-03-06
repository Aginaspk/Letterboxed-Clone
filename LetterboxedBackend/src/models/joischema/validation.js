import joi from "joi";

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
})

const joiUserLogin = joi.object({
    userName: joi.string().required(),
    password: joi.string().required(),
  });

  export {joiUserLogin,joiUserSchema}