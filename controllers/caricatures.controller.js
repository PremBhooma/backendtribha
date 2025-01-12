const Caricatures = require("../models/caricatures.model");
const { StatusCodes } = require("http-status-codes");

exports.create = async (req, res) => {
  try {
    const { image, name, productId, authorProfilePic, authorName, authorEmail, currentBid, auctionTime, likes } = req.body;

    const newDetails = new Caricatures({
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

exports.getCaricatures = async (req, res) => {
  try {
    let getData = await Caricatures.find({}).sort({ created_ts: -1 });

    let result = Array.isArray(getData) && getData.length === 1 ? getData[0] : getData;

    return res.status(StatusCodes.OK).json({
      errorcode: 0,
      status: true,
      message: "Get Caricatures Successfully",
      data: result,
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
