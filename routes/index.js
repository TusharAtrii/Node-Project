const express = require("express");
const router = express.Router();
const authentication = require("./Authentication");
const user = require("./User");
const auth = require("../middlewares/auth");
const get = require("./User/get");
const getMember = require("./User/member/post/getUser");
const username = require("./User/update/username");
const registerMember = require("./User/member/post/post");
const getHotelForParticularUser = require("./User/member/get/get");
const getHotelForCustomer = require("./User/getHotels");
const password = require("./User/update/password");
const extractParam = require("../middlewares/extractParams/extractParams");
const getInfo = require("./User/getInfo");
const searchHotels = require("./User/searchHotels");
const deleteHotel = require("./User/member/deleteHotel");
const update = require("./User/member/update");
const rooms = require("./rooms");
const booking = require("./payment/booking");
const paymentSuccess = require("./payment/paymentSuccess");
const availability = require("./rooms/availability");

router.use("/auth", authentication);
router.use("/register", user);
router.get("/getUserData", extractParam("authToken"), auth, get);
router.put("/username/:id", extractParam("id"), username);
router.put("/password/:id", extractParam("id"), password);
router.get("/getInfo/:id", extractParam("id"), auth, getInfo);
router.get("/getHotel/:id", extractParam("id"), getHotelForCustomer);
router.get("/hotels", auth, getHotelForParticularUser);
router.get("/getHotels", getHotelForCustomer);
router.get("/searchHotels", auth, searchHotels);
router.post("/getMember", getMember);
router.delete("/deleteHotel/:id", extractParam("id"), auth, deleteHotel);
router.put("/updateUser", update);
router.use("/deleteRoom", auth, rooms);
router.use("/deleteRoom/:id", extractParam("id"), rooms);
router.post('/bookingRequest',booking)
router.post('/payment',paymentSuccess)
router.put('/availability/:id',extractParam('id'),availability);
router.put('/availability',auth,availability);
// router.post('/registerMember',registerMember)
module.exports = router;
