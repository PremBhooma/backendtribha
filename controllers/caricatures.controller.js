const Caricatures = require("../models/caricatures.model");

exports.create = async (req, res) => {
  try {
    const { image, name, productId, authorProfilePic, authorName, authorEmail, currentBid, auctionTime } = req.body;

    const newDetails = new User({
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
    });

    await newDetails.save();

    return res.status(StatusCodes.CREATED).json({
      errorCode: 0,
      status: true,
      message: "Caricatures added successfully",
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