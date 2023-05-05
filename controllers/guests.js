import Guest from "../models/Guest.js"

// * UPDATED *//
export const addGuest = async (req, res) => {
  try {
    const oneGuest = new Guest({
      ip: req.socket.remoteAddress,
      count: 1
    });
    await oneGuest.save();
    const allGuest = await Guest.countDocuments();
    res.status(200).json(allGuest);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}
