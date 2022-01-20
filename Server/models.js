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
    type: Object,
    default: 300,
  },
  Token: {
    type: Number,
    default: 0,
  },
  NFTList: {
    type: [Object],
    default: [],
  },
});

export const UserDB = mongoose.model("User", UserSchema);

const CharacterSchema = mongoose.Schema({
  address: String,
  Pow: {
    type: Number,
    default: 1,
  },
  limit: {
    type: Number,
    default: 300,
  },
});

export const CharacetrDB = mongoose.model("Character", CharacterSchema);

const SellingSchema = mongoose.Schema({
  id: Number,
  seller: String,
  buyer: {
    type: String,
    default: "none",
  },
  price: Number,
  time: Object,
  item: Object,
});

export const SellingItemDB = mongoose.model("SellingItem", SellingSchema);

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
