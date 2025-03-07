import movieSchema from "../../models/schema/movieSchema.js";

const getNewMovies = async (req, res) => {
  const newMovies = await movieSchema.find().sort({ createdAt: -1 }).limit(6);

  res.status(200).json({
    message: "New movies fetched successfully",
    data: newMovies,
  });   
};

const getOscarsMovies = async (req,res)=>{
  const oscarsMovies = await movieSchema.find({isOscar:true});

  res.status(200).json({
    message:"Oscars movies fetched successfully",
    data:oscarsMovies
  })
}

export {getNewMovies,getOscarsMovies}