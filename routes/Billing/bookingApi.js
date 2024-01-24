const bookings = require("../../models/Billing/bookingSchema");

/**
 * 
 * @method  POST
 * @api  /bookRoom
 * @description  
 */


const post = async (req, res) => {
  try {

    const {data:{fullName,email,phone,guestName,guestEmail,totalGuests,startdate,enddate,totalDays,totalRooms,roomId},hotelId}=req.body;

    const result = new bookings({
        fullName,
        email,
        phone,
        guestName,
        guestEmail,
        totalGuests,
        bookFrom:startdate,
        bookTo:enddate,
        totalDays,
        totalRooms,
        roomId,
        hotelId,
        userId:req.user._id
      });
    const id = await result.save();
   return res.send({message:"Data Entered Successfull",bookingId:id._id});
  } catch (err) {
    res.send(err);
  }
};
module.exports = post;
