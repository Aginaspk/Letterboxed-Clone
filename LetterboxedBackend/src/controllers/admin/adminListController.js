import listSchema from "../../models/schema/listSchema.js"

const getALlLists = async(req,res)=>{
    const lists = await listSchema.find();
    res.status(200).json({
        data:lists
    })
}
const getListById = async(req,res)=>{
    const lists = await listSchema.findById(req.params.id);
    res.status(200).json({
        data:lists
    })
}
const getListsByUser = async(req,res)=>{
    const lists = await listSchema.find({user:req.params.id});
    res.status(200).json({
        data:lists
    })
}



export {getALlLists,getListById,getListsByUser}