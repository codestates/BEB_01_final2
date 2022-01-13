import mongoose from "mongoose";

const TokenSchema = mongoose.Schema({
  check: {
    type: Boolean,
    default: false,
  },

  To_Array: {
    type: [String],
    default: [],
  },
  messageHash: String,
  v: String,
  r: String,
  s: String,
  rawTransaction: String,
  transactionHash: String,
});
export const TokenDB = mongoose.model("Token", TokenSchema);
