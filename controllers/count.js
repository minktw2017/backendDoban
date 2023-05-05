import Visitor from "../models/Count.js";

// * UPDATED *//
export const addVisitor = async (req, res) => {
  try {
    const visitors = await Visitor.find();
    if (visitors == null) {
      const beginCount = new Visitor({
        name : "rootPage",
        count : 1
      });
      await beginCount.save();
      console.log("First visitor arrived");
    } else {
       visitors[0].count += 1;
       await visitors[0].save();
    }
    // Creating a new default record
    res.status(200).json(visitors);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

// export const getCount = async (req, res) => {
//   try {
//     const count = await Visitor.find();
//     res.status(200).json(count.length);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//     console.log(err); 
//   }
// }