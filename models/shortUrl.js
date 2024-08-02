import mongoose from "mongoose"
import shortid from "shortid"

const { Schema } = mongoose

const shortUrlsSchema = new Schema({
  full: {
    type: String,
    required: true,
  },
  short: {
    type: String,
    required: true,
    default: shortid.generate,
  },
  clicks: {
    type: Number,
    required: true,
    default: 0,
  },
})

export const ShortUrl = mongoose.model("ShortUrl", shortUrlsSchema)
