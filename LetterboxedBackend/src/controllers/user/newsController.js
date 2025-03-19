import newsSchema from "../../models/schema/newsSchema.js";

const getNewNews = async (req, res) => {
  const news = await newsSchema.find().sort({ createdAt: -1 }).limit(6);

  res.status(200).json({
    news: news,
  });
};

export {getNewNews}
