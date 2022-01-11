import mongoose from "mongoose";

const UserSchema = mongoose.Schema({
  ID: String,
  password: String,
  address: String,
  privateKey: String,
  CharacterName: String,
  HavingLands: {
    type: Number,
    default: 0,
  },
});

export const UserDB = mongoose.model("User", UserSchema);

const CharacterSchema = mongoose.Schema({
  CharacterName: String,
  Soldier: {
    type: Number,
    default: 500,
  },
  limit: {
    type: Number,
    default: 500,
  },
});

export const CharacterDB = mongoose.model("Character", CharacterSchema);

const MapSchema = mongoose.Schema({
  reload: Boolean,
  idx: Number,
  owner: String,
  MapName: String,
  topography: String,
  GiveToken: String,
  src: String,
});

export const MapDB = mongoose.model("Map", MapSchema);
