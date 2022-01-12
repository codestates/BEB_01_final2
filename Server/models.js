import mongoose from "mongoose";

const UserSchema = mongoose.Schema({
  ID: String,
  password: String,
  address: String,
  privateKey: String,
  HavingLands: {
    type: [String],
    default: [],
  },
  Soldier: {
    type: Number,
    default: 500,
  },
  Token: {
    type: Number,
    default: 0,
  },
});

export const UserDB = mongoose.model("User", UserSchema);

const ItemSchema = mongoose.Schema({
  reload: Boolean,
  id: Number,
  name: String,
  grade: String,
  src: String,
  pow: {
    type: Number,
    default: 0,
  },
});

export const ItemDB = mongoose.model("Item", ItemSchema);

const MapSchema = mongoose.Schema({
  reload: Boolean,
  idx: Number,
  owner: String,
  MapName: String,
  topography: String,
  GiveToken: String,
  src: String,
  force: {
    type: Number,
    default: 0,
  },
});

export const MapDB = mongoose.model("Map", MapSchema);

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
