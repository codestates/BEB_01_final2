import mongoose from "mongoose";

const TokenSchema = mongoose.Schema({
  check: {
    type: Boolean,
    default: false,
  },
  tx: Object,
  contract: String,
});

export const TokenDB = mongoose.model("Token", TokenSchema);
