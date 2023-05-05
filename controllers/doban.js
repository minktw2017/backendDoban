import Doban from "../models/Doban.js";

export const getDoban = async (req, res) => {
  try {
    const allVideos = await Doban.find();
    res.status(200).json(allVideos);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

export const getOneDoban = async (req, res) => {
  try {
    const video = await Doban.findById(req.params.id);
    video.views += 1;
    await video.save();
    res.status(200).json(video);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}