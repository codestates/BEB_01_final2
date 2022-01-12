import mongoose from "mongoose";

const TokenSchema = mongoose.Schema({
  check: {
    type: Boolean,
    default: false,
  },
  To: String,
  To_Array: {
    type: [String],
    default: [],
  },
  hash: String,
});

export const TokenDB = mongoose.model("Token", TokenSchema);
