const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const caricaturesSchema = new Schema(
  {
    image: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      require: true,
    },
    productId: {
      type: Number,
      require: true,
    },
    author: {
      authorProfilePic: {
        type: String,
        required: true,
      },
      authorName: {
        type: String,
        required: true,
      },
      authorEmail: {
        type: String,
        required: true,
      },
    },
    currentBid: {
      type: String,
      require: true,
    },
    auctionTime: {
      type: String,
      require: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Caricatures", caricaturesSchema);
