const Bids = require("../models/bids.model");
const { StatusCodes } = require("http-status-codes");

exports.create = async (req, res) => {
  try {
    const { image, name, productId, authorProfilePic, authorName, authorEmail, currentBid, auctionTime, likes, category } = req.body;

    const newDetails = new Bids({
      image,
      name,
      productId,
      author: {
        authorProfilePic: authorProfilePic,
        authorName: authorName,
        authorEmail: authorEmail,
      },
      currentBid: currentBid,
      auctionTime: auctionTime,
      likes,
      category,
    });

    await newDetails.save();

    return res.status(StatusCodes.CREATED).json({
      errorCode: 0,
      status: true,
      message: "Bids added successfully",
      data: newDetails,
    });
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      errorCode: 5,
      status: false,
      message: error.message,
      data: error,
    });
  }
};

exports.getTrending = async (req, res) => {
  try {
    const { category } = req.query;

    const filter = category ? { category } : {};

    const getData = await Bids.find(filter).sort({ createdAt: 1 });

    return res.status(StatusCodes.OK).json({
      errorcode: 0,
      status: true,
      message: "Get Trending Successfully",
      data: getData,
    });
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      errorcode: 5,
      status: false,
      message: error.message,
      data: error,
    });
  }
};
