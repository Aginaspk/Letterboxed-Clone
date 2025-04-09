import reviewSchema from "../../models/schema/reviewSchema.js"

const getAllReviews = async(req,res)=>{
    const reviews = await reviewSchema.find();
    res.status(200).json({
        data:reviews
    })
}

export {getAllReviews}