import { joiMovieScema } from "../../models/joischema/validation";

const createProduct = async (req, res, next) => {
    const { value, error } = joiMovieScema.validate(req.body);
    if (error) {
      return next(new CustomError(error.details[0].message, 400));
    }
    if (!req.files || !req.files.length === 0) {
      return next(new CustomError("image not found"));
    }
    const imagePaths = req.files.map((file) => file.path);
  
    const sizesArray = Array.isArray(req.body.sizes)
        ? req.body.sizes.map(Number)
        : req.body.sizes.split(",").map(Number);
  
    const newProduct = new productSchema({
      ...value,
      sizes:sizesArray,
      images: imagePaths,
    });
    if (!newProduct) {
      return next(new CustomError("product is not created", 500));
    }
    await newProduct.save();
    res.status(201).json({
      message: "Product created successfully",
    });
  };