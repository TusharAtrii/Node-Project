const hotelDetails = require("../../models/Hotel/hotelSchema");

module.exports = async (req, res) => {
  try {
    if (!req.id) {
      const data = await hotelDetails.find({});
      console.log("All hotels send as data");
      res.send(data);
    } else {
      console.log(req.id);
      const data = await hotelDetails.find({ _id: req.id });
      console.log("Particular hotel send as data");
      res.send(data);
    }
  } catch (error) {
    res.send(error);
  }
};
